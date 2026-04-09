(function () {
  'use strict';

  var C = window.SITE_CONFIG;
  var appEl = document.getElementById('app');
  var currentRoute = null;
  var currentParams = {};

  var postsCache = null;
  var postContentCache = {};

  var ROUTES = [
    { id: 'home',          path: '/',              nav: 'home',          title: C.companyName + ' | Licensed Plumber in NEPA',   desc: C.description },
    { id: 'about',         path: '/about',         nav: 'about',         title: 'About Us | ' + C.companyName,                   desc: 'Learn about PrimeFlow Plumbing — licensed and insured plumbing contractor serving Northeastern Pennsylvania with premium service and quality workmanship.' },
    { id: 'services',      path: '/services',      nav: 'services',      title: 'Plumbing Services | ' + C.companyName,          desc: 'Professional plumbing services in NEPA — drain cleaning, water heaters, leak detection, emergency plumbing, and more. Call ' + C.phone + '.' },
    { id: 'service',       path: '/services/:slug', nav: 'services',     title: 'Service | ' + C.companyName,                    desc: 'Professional plumbing service from PrimeFlow Plumbing. Licensed, insured, and serving all of Northeastern PA.' },
    { id: 'service-areas', path: '/service-areas',  nav: 'service-areas', title: 'Service Areas | ' + C.companyName,              desc: 'PrimeFlow Plumbing serves Scranton, Wilkes-Barre, Hazleton, East Stroudsburg, Allentown, and all of Northeastern Pennsylvania.' },
    { id: 'location',      path: '/service-areas/:slug', nav: 'service-areas', title: 'Service Area | ' + C.companyName,         desc: 'Professional plumbing services in your area from PrimeFlow Plumbing.' },
    { id: 'contact',       path: '/contact',       nav: 'contact',       title: 'Contact Us | ' + C.companyName,                 desc: 'Contact PrimeFlow Plumbing for a free estimate. Call ' + C.phone + ' or fill out our online form. Serving all of Northeastern PA.' },
    { id: 'testimonials',  path: '/testimonials',  nav: 'testimonials',  title: 'Reviews & Testimonials | ' + C.companyName,     desc: 'Read what our customers say about PrimeFlow Plumbing. 5-star rated plumber serving Northeastern Pennsylvania.' },
    { id: 'gallery',       path: '/gallery',       nav: 'gallery',       title: 'Project Gallery | ' + C.companyName,            desc: 'View our plumbing project gallery — water heater installations, bathroom remodels, pipe repairs, and more across NEPA.' },
    { id: 'faq',           path: '/faq',           nav: 'faq',           title: 'FAQ | ' + C.companyName,                        desc: 'Frequently asked questions about PrimeFlow Plumbing services, pricing, service areas, and more.' },
    { id: 'financing',     path: '/financing',     nav: 'financing',     title: 'Financing & Offers | ' + C.companyName,         desc: 'Flexible financing options for plumbing services. Make your plumbing project affordable with PrimeFlow Plumbing.' },
    { id: 'coupons',       path: '/coupons',       nav: 'coupons',       title: 'Coupons & Specials | ' + C.companyName,         desc: 'Save on plumbing services with PrimeFlow Plumbing coupons and special offers.' },
    { id: 'blog',          path: '/blog',          nav: 'blog',          title: 'Blog | ' + C.companyName,                       desc: 'Plumbing tips, maintenance guides, and industry news from PrimeFlow Plumbing.' },
    { id: 'blog-post',     path: '/blog/:slug',    nav: 'blog',          title: 'Blog | ' + C.companyName,                       desc: 'Read the latest plumbing tips and news from PrimeFlow Plumbing.' },
  ];

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function normalizeImageSrc(src) {
    if (!src || typeof src !== 'string') return '';
    src = src.trim();
    if (!src || src === '""' || src === "''") return '';
    if (src.startsWith('http') || src.startsWith('/') || src.startsWith('data:')) return src;
    return '/' + src;
  }

  function normalizePath(path) {
    path = path.split('?')[0].split('#')[0];
    path = path.replace(/\.html$/, '');
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    if (path === '' || path === '/index') path = '/';
    return path;
  }

  function getHash(url) {
    var idx = url.indexOf('#');
    return idx !== -1 ? url.substring(idx) : '';
  }

  function matchRoute(path) {
    var normalized = normalizePath(path);

    for (var i = 0; i < ROUTES.length; i++) {
      if (ROUTES[i].path === normalized) return { route: ROUTES[i], params: {} };
    }

    var serviceMatch = normalized.match(/^\/services\/([a-z0-9][a-z0-9-]*)$/);
    if (serviceMatch) {
      var svc = findService(serviceMatch[1]);
      if (svc) return { route: ROUTES.find(function(r) { return r.id === 'service'; }), params: { slug: serviceMatch[1] } };
    }

    var locationMatch = normalized.match(/^\/service-areas\/([a-z0-9][a-z0-9-]*)$/);
    if (locationMatch) {
      var loc = findLocation(locationMatch[1]);
      if (loc) return { route: ROUTES.find(function(r) { return r.id === 'location'; }), params: { slug: locationMatch[1] } };
    }

    var blogMatch = normalized.match(/^\/blog\/([a-z0-9][a-z0-9-]*)$/);
    if (blogMatch) {
      return { route: ROUTES.find(function(r) { return r.id === 'blog-post'; }), params: { slug: blogMatch[1] } };
    }

    return null;
  }

  function findService(slug) {
    for (var i = 0; i < C.services.length; i++) {
      if (C.services[i].id === slug) return C.services[i];
    }
    return null;
  }

  function findLocation(slug) {
    for (var i = 0; i < C.locations.length; i++) {
      if (C.locations[i].slug === slug) return C.locations[i];
    }
    return null;
  }

  function updateMeta(route, params) {
    var title = route.title;
    var desc = route.desc;

    if (route.id === 'service' && params.slug) {
      var svc = findService(params.slug);
      if (svc) {
        title = svc.title + ' | ' + C.companyName;
        desc = svc.shortDesc;
      }
    }
    if (route.id === 'location' && params.slug) {
      var loc = findLocation(params.slug);
      if (loc) {
        title = loc.heroTitle + ' | ' + C.companyName;
        desc = loc.description.substring(0, 160);
      }
    }

    document.title = title;

    var setMeta = function (sel, attr, val) {
      var el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };

    var pathStr = route.path;
    if (route.id === 'service') pathStr = '/services/' + params.slug;
    else if (route.id === 'location') pathStr = '/service-areas/' + params.slug;
    else if (route.id === 'blog-post') pathStr = '/blog/' + params.slug;

    var canonical = C.seo.siteUrl + pathStr;
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', desc);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', C.seo.siteUrl + C.seo.ogImage);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', desc);
    setMeta('meta[name="twitter:image"]', 'content', C.seo.siteUrl + C.seo.ogImage);
  }

  function navigate(url, push) {
    var hash = getHash(url);
    var path = url.split('#')[0];
    var match = matchRoute(path);

    if (!match) {
      match = { route: ROUTES[0], params: {} };
      path = '/';
    }

    var route = match.route;
    var params = match.params;
    var isSamePage = currentRoute && currentRoute.id === route.id && JSON.stringify(currentParams) === JSON.stringify(params);

    if (!isSamePage) {
      var templateId = 'page-' + route.id;
      var tmpl = document.getElementById(templateId);
      if (tmpl) {
        appEl.innerHTML = '';
        appEl.appendChild(tmpl.content.cloneNode(true));
        var firstChild = appEl.firstElementChild;
        if (firstChild) firstChild.classList.add('page-enter');
      }

      renderHeader(route.nav);
      updateMeta(route, params);

      currentRoute = route;
      currentParams = params;

      var initFn = PAGE_INITS[route.id];
      if (initFn) initFn(params);

      refreshAnimations();
      if (!hash) window.scrollTo(0, 0);
    }

    if (push !== false) {
      var cleanPath;
      if (route.id === 'service') cleanPath = '/services/' + params.slug;
      else if (route.id === 'location') cleanPath = '/service-areas/' + params.slug;
      else if (route.id === 'blog-post') cleanPath = '/blog/' + params.slug;
      else cleanPath = route.path;
      history.pushState({ path: cleanPath + hash }, '', cleanPath + hash);
    }

    if (hash) {
      setTimeout(function () {
        var target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }

  function shouldIntercept(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.target === '_blank') return false;
    if (anchor.hasAttribute('download')) return false;
    var href = anchor.getAttribute('href');
    if (!href || href.startsWith('#')) return false;
    if (href.startsWith('tel:') || href.startsWith('mailto:')) return false;
    if (href.startsWith('http') && !href.startsWith(location.origin)) return false;
    if (href.startsWith('/admin')) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a');
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      var target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      return;
    }
    if (!shouldIntercept(anchor)) return;
    e.preventDefault();
    navigate(anchor.getAttribute('href'), true);
  });

  window.addEventListener('popstate', function () {
    navigate(location.pathname + location.hash, false);
  });

  // ============================= PAGE INITIALIZERS =============================
  var PAGE_INITS = {};

  PAGE_INITS.home = function () {
    var badgesGrid = document.getElementById('trust-badges');
    if (badgesGrid) {
      badgesGrid.innerHTML = C.trustBadges.map(function (b) {
        return '<div class="trust-badge" data-animate>' +
          '<div class="icon-box-teal">' + getIcon(b.icon) + '</div>' +
          '<div><h3 class="font-bold text-gray-900">' + b.title + '</h3><p class="text-gray-600 text-sm mt-1">' + b.text + '</p></div></div>';
      }).join('');
    }

    var servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
      servicesGrid.innerHTML = C.services.slice(0, 6).map(function (s) {
        return '<a href="/services/' + s.id + '" class="service-card group" data-animate>' +
          '<div class="icon-box-teal group-hover:bg-teal-600 group-hover:text-white transition-colors mb-4">' + getIcon(s.icon) + '</div>' +
          '<h3 class="text-lg font-bold text-gray-900 mb-2">' + s.title + '</h3>' +
          '<p class="text-gray-600 text-sm mb-4 line-clamp-2">' + s.shortDesc + '</p>' +
          '<span class="text-teal-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">Learn More ' + getIcon('chevronRight') + '</span></a>';
      }).join('');
    }

    var testimonialsGrid = document.getElementById('testimonials-grid');
    if (testimonialsGrid) {
      testimonialsGrid.innerHTML = C.testimonials.slice(0, 3).map(function (t) {
        return '<div class="testimonial-card" data-animate>' +
          '<div class="flex gap-1 mb-3">' + renderStars(t.rating) + '</div>' +
          '<p class="text-gray-700 mb-4">"' + t.text + '"</p>' +
          '<div class="flex items-center gap-3">' +
          '<div class="w-10 h-10 bg-gradient-to-br from-primary-700 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">' + t.name.charAt(0) + '</div>' +
          '<div><p class="font-semibold text-gray-900 text-sm">' + t.name + '</p><p class="text-gray-500 text-xs">' + t.location + '</p></div></div></div>';
      }).join('');
    }

    var areasPreview = document.getElementById('areas-preview');
    if (areasPreview) {
      areasPreview.innerHTML = C.serviceAreas.slice(0, 16).map(function (area) {
        return '<span class="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-teal-300 hover:text-teal-600 transition-colors">' + area + '</span>';
      }).join('');
    }

    var recentPosts = document.getElementById('recent-posts');
    if (recentPosts) {
      fetchPosts().then(function (posts) {
        var recent = posts.slice(0, 3);
        if (!recent.length) { recentPosts.innerHTML = '<p class="text-gray-500 text-center col-span-3">Blog posts coming soon!</p>'; return; }
        recentPosts.innerHTML = recent.map(function (p) {
          var date = new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
          var imgSrc = normalizeImageSrc(p.image);
          var img = imgSrc
            ? '<div class="bg-gray-50"><img src="' + imgSrc + '" alt="" class="w-full h-auto" loading="lazy" onerror="this.style.display=\'none\'"></div>'
            : '<div class="w-full h-48 bg-gradient-to-br from-teal-100 to-primary-100 flex items-center justify-center">' + getIcon('droplet').replace(/w-8 h-8/g, 'w-10 h-10') + '</div>';
          return '<article class="card group" data-animate><a href="/blog/' + p.slug + '">' + img +
            '<div class="p-5"><time class="text-xs text-teal-600 font-medium">' + date + '</time>' +
            '<h3 class="font-bold text-gray-900 mt-1 mb-2 group-hover:text-teal-600 transition-colors">' + p.title + '</h3>' +
            '<p class="text-gray-600 text-sm line-clamp-2">' + (p.excerpt || '') + '</p></div></a></article>';
        }).join('');
      }).catch(function () {
        recentPosts.innerHTML = '<p class="text-gray-500 text-center col-span-3">Blog posts coming soon!</p>';
      });
    }
  };

  PAGE_INITS.about = function () {};

  PAGE_INITS.services = function () {
    var grid = document.getElementById('all-services-grid');
    if (!grid) return;
    grid.innerHTML = C.services.map(function (s) {
      return '<a href="/services/' + s.id + '" class="service-card group" data-animate>' +
        '<div class="icon-box-teal group-hover:bg-teal-600 group-hover:text-white transition-colors mb-4">' + getIcon(s.icon) + '</div>' +
        '<h3 class="text-lg font-bold text-gray-900 mb-2">' + s.title + '</h3>' +
        '<p class="text-gray-600 text-sm mb-4 line-clamp-3">' + s.shortDesc + '</p>' +
        '<span class="text-teal-600 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">View Service ' + getIcon('chevronRight') + '</span></a>';
    }).join('');
  };

  PAGE_INITS.service = function (params) {
    var svc = findService(params.slug);
    if (!svc) return;

    var heroEl = document.getElementById('service-hero-title');
    var heroDesc = document.getElementById('service-hero-desc');
    var content = document.getElementById('service-content');

    if (heroEl) heroEl.textContent = svc.title;
    if (heroDesc) heroDesc.textContent = svc.shortDesc;

    if (!content) return;

    var benefits = svc.benefits.map(function(b) {
      return '<li class="flex items-start gap-3"><div class="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">' +
        '<svg class="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></div>' +
        '<span class="text-gray-700">' + b + '</span></li>';
    }).join('');

    var problems = svc.commonProblems.map(function(p) {
      return '<li class="flex items-start gap-3"><div class="w-6 h-6 bg-emergency-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">' +
        '<svg class="h-3.5 w-3.5 shrink-0 text-emergency-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>' +
        '<span class="text-gray-700">' + p + '</span></li>';
    }).join('');

    var steps = svc.processSteps.map(function(step, i) {
      return '<div class="flex items-start gap-4" data-animate>' +
        '<div class="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">' + (i + 1) + '</div>' +
        '<div class="pt-2"><p class="font-semibold text-gray-900">' + step + '</p></div></div>';
    }).join('');

    var faqs = svc.faqs.map(function(faq, i) {
      return '<div class="faq-item" data-animate>' +
        '<button class="faq-question" onclick="this.parentElement.classList.toggle(\'active\');this.nextElementSibling.classList.toggle(\'hidden\')">' +
        '<span>' + faq.q + '</span>' +
        '<svg class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
        '</button><div class="faq-answer hidden">' + faq.a + '</div></div>';
    }).join('');

    var related = (svc.relatedServices || []).map(function(rid) {
      var rs = findService(rid);
      if (!rs) return '';
      return '<a href="/services/' + rs.id + '" class="service-card !p-4" data-animate>' +
        '<div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-3">' + getIcon(rs.icon).replace(/w-8 h-8/g, 'w-5 h-5') + '</div>' +
        '<h4 class="font-bold text-gray-900 text-sm">' + rs.title + '</h4>' +
        '<span class="text-teal-600 text-xs font-medium mt-1 inline-flex items-center gap-1">Learn More →</span></a>';
    }).join('');

    content.innerHTML =
      '<section class="section-padding bg-white" data-animate><div class="container-site"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12">' +
        '<div><span class="section-label mb-4 block"><span class="w-2 h-2 bg-teal-500 rounded-full"></span> About This Service</span>' +
        '<h2 class="heading-lg mb-6">' + svc.title + '</h2>' +
        '<p class="text-gray-600 text-lg leading-relaxed mb-8">' + svc.description + '</p>' +
        '<div class="flex flex-col sm:flex-row gap-3">' +
        '<a href="/contact" class="btn-teal">Schedule Service</a>' +
        '<a href="tel:' + C.phoneRaw + '" class="btn-outline">Call ' + C.phone + '</a></div></div>' +
        '<div class="bg-gradient-to-br from-primary-50 to-teal-50 rounded-2xl p-8 border border-teal-100">' +
        '<h3 class="heading-md mb-6 flex items-center gap-2"><span class="w-2 h-2 bg-teal-500 rounded-full"></span> Key Benefits</h3>' +
        '<ul class="space-y-4">' + benefits + '</ul></div>' +
      '</div></div></section>' +

      '<section class="section-padding bg-gray-50" data-animate><div class="container-site">' +
        '<div class="text-center mb-12"><span class="section-label justify-center"><span class="w-2 h-2 bg-teal-500 rounded-full"></span> How It Works</span>' +
        '<h2 class="heading-lg mt-2">Our ' + svc.title + ' Process</h2></div>' +
        '<div class="max-w-2xl mx-auto space-y-6">' + steps + '</div>' +
      '</div></section>' +

      '<section class="section-padding bg-white" data-animate><div class="container-site">' +
        '<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">' +
        '<div><h2 class="heading-lg mb-6">Common Problems We Solve</h2>' +
        '<ul class="space-y-3">' + problems + '</ul></div>' +
        '<div><h2 class="heading-lg mb-6">Frequently Asked Questions</h2>' +
        '<div class="space-y-3">' + faqs + '</div></div></div>' +
      '</div></section>' +

      '<section class="py-12 bg-gradient-to-r from-red-900 via-red-600 to-red-500 shadow-lg shadow-red-900/25" data-animate><div class="container-site text-center">' +
        '<div class="flex flex-col sm:flex-row items-center justify-center gap-6">' +
        '<div class="text-left sm:text-center"><h3 class="text-2xl font-bold text-white drop-shadow-md">Need Emergency ' + svc.title + '?</h3>' +
        '<p class="text-red-100 mt-1">We\'re available 24/7 for urgent plumbing issues.</p></div>' +
        '<a href="tel:' + C.phoneRaw + '" class="btn-accent text-lg !px-8 !py-4">' +
        getIcon('phone') + ' <span class="ml-2">Call ' + C.phone + '</span></a></div>' +
      '</div></section>' +

      (related ? '<section class="section-padding bg-gray-50" data-animate><div class="container-site">' +
        '<h2 class="heading-lg text-center mb-10">Related Services</h2>' +
        '<div class="grid grid-cols-2 md:grid-cols-4 gap-4">' + related + '</div>' +
      '</div></section>' : '') +

      '<section class="section-padding bg-white" data-animate><div class="container-site text-center">' +
        '<h2 class="heading-lg mb-4">Serving All of Northeastern Pennsylvania</h2>' +
        '<p class="text-gray-600 mb-8 max-w-2xl mx-auto">PrimeFlow Plumbing provides ' + svc.title.toLowerCase() + ' services to Scranton, Wilkes-Barre, Hazleton, East Stroudsburg, Allentown, and dozens of surrounding NEPA communities.</p>' +
        '<div class="flex flex-wrap justify-center gap-2 mb-8">' +
        C.serviceAreas.slice(0, 12).map(function(a) { return '<span class="badge-navy">' + a + '</span>'; }).join('') +
        '</div><a href="/contact" class="btn-teal">Get a Free Estimate</a>' +
      '</div></section>';
  };

  PAGE_INITS['service-areas'] = function () {
    var areasGrid = document.getElementById('areas-grid');
    if (areasGrid) {
      areasGrid.innerHTML = C.serviceAreas.map(function (area) {
        return '<div class="bg-gray-50 rounded-xl p-4 text-center hover:bg-teal-50 hover:border-teal-200 border border-gray-100 transition-colors group">' +
          '<div class="flex items-center justify-center gap-2">' +
          getIcon('mapPin').replace(/h-5 w-5/g, 'h-4 w-4') +
          '<span class="font-medium text-gray-700 group-hover:text-teal-700">' + area + '</span></div></div>';
      }).join('');
    }

    var locationsGrid = document.getElementById('locations-grid');
    if (locationsGrid) {
      locationsGrid.innerHTML = C.locations.map(function(loc) {
        return '<a href="/service-areas/' + loc.slug + '" class="location-card group" data-animate>' +
          '<div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mx-auto mb-3">' +
          getIcon('mapPin').replace(/h-5 w-5/g, 'h-6 w-6') + '</div>' +
          '<h3 class="font-bold text-gray-900 mb-1">' + loc.name + '</h3>' +
          '<p class="text-gray-500 text-sm">' + (loc.state || 'PA') + '</p>' +
          '<span class="text-teal-600 text-sm font-medium mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">View Details →</span></a>';
      }).join('');
    }

    var mapContainer = document.getElementById('service-areas-map');
    if (mapContainer) {
      mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384828.65!2d-75.85!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c4d2f9f9fafcf3%3A0x93eb0c3c1e22b4dc!2sNortheastern%20Pennsylvania!5e0!3m2!1sen!2sus!4v1" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="PrimeFlow Plumbing service area map"></iframe>';
    }
  };

  PAGE_INITS.location = function (params) {
    var loc = findLocation(params.slug);
    if (!loc) return;

    var heroEl = document.getElementById('location-hero-title');
    var heroDesc = document.getElementById('location-hero-desc');
    var content = document.getElementById('location-content');

    if (heroEl) heroEl.textContent = loc.heroTitle;
    if (heroDesc) heroDesc.textContent = loc.description.substring(0, 200) + '...';

    if (!content) return;

    var highlights = loc.highlights.map(function(h) {
      return '<li class="flex items-center gap-3">' +
        '<svg class="w-5 h-5 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>' +
        '<span class="text-gray-700">' + h + '</span></li>';
    }).join('');

    var nearby = loc.nearbyAreas.map(function(a) {
      return '<span class="badge-navy">' + a + '</span>';
    }).join('');

    var services = C.services.slice(0, 8).map(function(s) {
      return '<a href="/services/' + s.id + '" class="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition-colors">' +
        '<span class="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 flex-shrink-0">' + getIcon(s.icon).replace(/w-8 h-8/g, 'w-4 h-4') + '</span>' +
        '<span class="text-gray-700 font-medium text-sm">' + s.title + '</span></a>';
    }).join('');

    var faqs = loc.faqs.map(function(faq) {
      return '<div class="faq-item" data-animate>' +
        '<button class="faq-question" onclick="this.parentElement.classList.toggle(\'active\');this.nextElementSibling.classList.toggle(\'hidden\')">' +
        '<span>' + faq.q + '</span>' +
        '<svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
        '</button><div class="faq-answer hidden">' + faq.a + '</div></div>';
    }).join('');

    content.innerHTML =
      '<section class="section-padding bg-white" data-animate><div class="container-site"><div class="grid grid-cols-1 lg:grid-cols-2 gap-12">' +
        '<div><span class="section-label mb-4 block"><span class="w-2 h-2 bg-teal-500 rounded-full"></span> ' + loc.name + ', PA</span>' +
        '<h2 class="heading-lg mb-6">Premium Plumbing for ' + loc.name + '</h2>' +
        '<p class="text-gray-600 text-lg leading-relaxed mb-6">' + loc.description + '</p>' +
        '<ul class="space-y-3 mb-8">' + highlights + '</ul>' +
        '<a href="/contact" class="btn-teal">Get a Free Estimate in ' + loc.name + '</a></div>' +
        '<div><div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">' +
        '<h3 class="font-bold text-gray-900 mb-4">Services Available in ' + loc.name + '</h3>' +
        '<div class="space-y-1">' + services + '</div>' +
        '<a href="/services" class="block text-center text-teal-600 font-medium text-sm mt-4 hover:text-teal-700">View All 23 Services →</a></div>' +
        '<div class="bg-teal-50 rounded-2xl p-6 border border-teal-100">' +
        '<h3 class="font-bold text-gray-900 mb-3">Also Serving Nearby:</h3>' +
        '<div class="flex flex-wrap gap-2">' + nearby + '</div></div></div>' +
      '</div></div></section>' +

      '<section class="section-padding bg-gray-50" data-animate><div class="container-site">' +
        '<h2 class="heading-lg text-center mb-8">' + loc.name + ' Plumbing FAQ</h2>' +
        '<div class="max-w-3xl mx-auto space-y-3">' + faqs + '</div>' +
      '</div></section>';
  };

  PAGE_INITS.contact = function () {
    var select = document.getElementById('service');
    if (select) {
      C.services.forEach(function (s) {
        var opt = document.createElement('option');
        opt.value = s.title;
        opt.textContent = s.title;
        select.appendChild(opt);
      });
    }
    var mapContainer = document.getElementById('contact-map');
    if (mapContainer) {
      mapContainer.innerHTML = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d384828.65!2d-75.85!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c4d2f9f9fafcf3%3A0x93eb0c3c1e22b4dc!2sNortheastern%20Pennsylvania!5e0!3m2!1sen!2sus!4v1" width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="PrimeFlow Plumbing service area map"></iframe>';
    }
    initContactForm();
  };

  PAGE_INITS.testimonials = function () {
    var grid = document.getElementById('testimonials-full-grid');
    if (!grid) return;
    grid.innerHTML = C.testimonials.map(function (t) {
      return '<div class="testimonial-card" data-animate>' +
        '<div class="flex gap-1 mb-3">' + renderStars(t.rating) + '</div>' +
        '<p class="text-gray-700 mb-4">"' + t.text + '"</p>' +
        (t.service ? '<span class="badge-teal mb-3">' + t.service + '</span>' : '') +
        '<div class="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100">' +
        '<div class="w-10 h-10 bg-gradient-to-br from-primary-700 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">' + t.name.charAt(0) + '</div>' +
        '<div><p class="font-semibold text-gray-900 text-sm">' + t.name + '</p><p class="text-gray-500 text-xs">' + t.location + '</p></div></div></div>';
    }).join('');
  };

  PAGE_INITS.gallery = function () {};

  PAGE_INITS.faq = function () {
    var container = document.getElementById('faq-list');
    if (!container) return;
    container.innerHTML = C.generalFaqs.map(function(faq) {
      return '<div class="faq-item" data-animate>' +
        '<button class="faq-question" onclick="this.parentElement.classList.toggle(\'active\');this.nextElementSibling.classList.toggle(\'hidden\')">' +
        '<span>' + faq.q + '</span>' +
        '<svg class="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
        '</button><div class="faq-answer hidden">' + faq.a + '</div></div>';
    }).join('');
  };

  PAGE_INITS.financing = function () {};

  PAGE_INITS.coupons = function () {
    var grid = document.getElementById('coupons-grid');
    if (!grid) return;
    grid.innerHTML = C.coupons.map(function(c) {
      return '<div class="coupon-card" data-animate>' +
        '<div class="absolute top-0 right-0 w-20 h-20 bg-teal-200/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>' +
        '<div class="relative">' +
        '<h3 class="text-3xl font-extrabold text-teal-700">' + c.title + '</h3>' +
        '<p class="text-lg font-bold text-gray-900 mt-1">' + c.subtitle + '</p>' +
        '<p class="text-gray-600 text-sm mt-3">' + c.description + '</p>' +
        (c.code ? '<div class="mt-4 inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-teal-200"><span class="text-xs text-gray-500">CODE:</span><span class="font-mono font-bold text-teal-700">' + c.code + '</span></div>' : '') +
        '<p class="text-xs text-gray-400 mt-3">' + c.expiry + '</p>' +
        '</div></div>';
    }).join('');
  };

  // ---------- BLOG ----------
  var blogCurrentPage = 1;
  var POSTS_PER_PAGE = 9;

  PAGE_INITS.blog = function () {
    blogCurrentPage = 1;
    var grid = document.getElementById('blog-grid');
    if (!grid) return;
    fetchPosts().then(function (posts) {
      var loading = document.getElementById('blog-loading');
      var empty = document.getElementById('blog-empty');
      if (loading) loading.classList.add('hidden');
      if (!posts.length) { if (empty) empty.classList.remove('hidden'); return; }
      renderBlogPage(1);
    }).catch(function () {
      var loading = document.getElementById('blog-loading');
      var empty = document.getElementById('blog-empty');
      if (loading) loading.classList.add('hidden');
      if (empty) { empty.classList.remove('hidden'); empty.innerHTML = '<p class="text-gray-500 text-lg">Blog posts coming soon!</p>'; }
    });
  };

  function renderBlogPage(page) {
    blogCurrentPage = page;
    var grid = document.getElementById('blog-grid');
    if (!grid || !postsCache) return;
    var start = (page - 1) * POSTS_PER_PAGE;
    var pagePosts = postsCache.slice(start, start + POSTS_PER_PAGE);
    grid.innerHTML = pagePosts.map(function (post) {
      var date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      var postImgSrc = normalizeImageSrc(post.image);
      var image = postImgSrc
        ? '<div class="bg-gray-50"><img src="' + postImgSrc + '" alt="' + escapeHtml(post.title) + '" class="w-full h-auto" loading="lazy" onerror="this.style.display=\'none\'"></div>'
        : '<div class="w-full h-48 bg-gradient-to-br from-teal-100 to-primary-100 flex items-center justify-center">' + getIcon('droplet').replace(/w-8 h-8/g, 'w-12 h-12') + '</div>';
      return '<article class="card group" data-animate><a href="/blog/' + post.slug + '">' + image +
        '<div class="p-6"><time class="text-sm text-teal-600 font-medium">' + date + '</time>' +
        '<h3 class="text-lg font-bold text-gray-900 mt-2 mb-2 group-hover:text-teal-600 transition-colors">' + escapeHtml(post.title) + '</h3>' +
        '<p class="text-gray-600 text-sm line-clamp-3">' + escapeHtml(post.excerpt || '') + '</p>' +
        '<span class="inline-flex items-center text-teal-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">Read More ' + getIcon('chevronRight') + '</span></div></a></article>';
    }).join('');
    renderBlogPagination();
  }

  function renderBlogPagination() {
    var container = document.getElementById('blog-pagination');
    if (!container || !postsCache) return;
    var totalPages = Math.ceil(postsCache.length / POSTS_PER_PAGE);
    if (totalPages <= 1) { container.innerHTML = ''; return; }
    var html = '<div class="flex items-center justify-center gap-2">';
    if (blogCurrentPage > 1) html += '<button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors" data-blog-page="' + (blogCurrentPage - 1) + '">&larr; Previous</button>';
    for (var i = 1; i <= totalPages; i++) {
      html += '<button class="w-10 h-10 rounded-lg font-medium transition-colors ' + (i === blogCurrentPage ? 'bg-teal-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50') + '" data-blog-page="' + i + '">' + i + '</button>';
    }
    if (blogCurrentPage < totalPages) html += '<button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors" data-blog-page="' + (blogCurrentPage + 1) + '">Next &rarr;</button>';
    html += '</div>';
    container.innerHTML = html;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-blog-page]');
    if (!btn) return;
    renderBlogPage(parseInt(btn.getAttribute('data-blog-page'), 10));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  PAGE_INITS['blog-post'] = function (params) {
    var slug = params.slug;
    if (!slug) { showPostNotFound(); return; }
    Promise.all([loadMarked(), loadPostContent(slug), fetchPosts()]).then(function (results) {
      var text = results[1];
      var posts = results[2];
      var parsed = parseFrontMatter(text);
      var postMeta = null;
      for (var i = 0; i < posts.length; i++) { if (posts[i].slug === slug) { postMeta = posts[i]; break; } }
      if (postMeta && postMeta.image && !parsed.data.image) parsed.data.image = postMeta.image;
      renderBlogPost(parsed.data, parsed.content, slug);
    }).catch(function () { showPostNotFound(); });
  };

  function loadPostContent(slug) {
    if (postContentCache[slug]) return Promise.resolve(postContentCache[slug]);
    return fetch('/content/blog/' + slug + '.md').then(function (res) {
      if (!res.ok) throw new Error('Not found');
      return res.text();
    }).then(function (text) { postContentCache[slug] = text; return text; });
  }

  function parseFrontMatter(text) {
    var match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: text };
    var data = {};
    match[1].split('\n').forEach(function (line) {
      if (line.match(/^\s*-\s/)) return;
      var colonIdx = line.indexOf(':');
      if (colonIdx === -1) return;
      var key = line.slice(0, colonIdx).trim();
      if (!key) return;
      var value = line.slice(colonIdx + 1).trim().replace(/^["'](.*)["']$/, '$1');
      if ((key === 'image' || key === 'thumbnail') && (!value || value === '""' || value === "''")) value = '';
      data[key] = value;
    });
    return { data: data, content: match[2] };
  }

  function renderBlogPost(meta, markdown, slug) {
    var title = meta.title || 'Blog Post';
    var date = meta.date ? new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    var image = normalizeImageSrc(meta.image || meta.thumbnail || '');
    document.title = title + ' | ' + C.companyName;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && meta.description) metaDesc.setAttribute('content', meta.description);
    var heroImage = image ? '<img src="' + image + '" alt="' + escapeHtml(title) + '" class="w-full h-auto rounded-xl mb-8" onerror="this.style.display=\'none\'">' : '';
    var html = marked.parse(markdown);
    var container = document.getElementById('blog-post-content');
    if (container) {
      container.innerHTML =
        '<article class="max-w-3xl mx-auto">' +
        '<a href="/blog" class="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium mb-6 group">' +
        '<svg class="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>Back to Blog</a>' +
        heroImage +
        '<header class="mb-8">' + (date ? '<time class="text-teal-600 font-medium">' + date + '</time>' : '') +
        '<h1 class="heading-xl mt-2 text-balance">' + escapeHtml(title) + '</h1></header>' +
        '<div class="prose-blog">' + html + '</div>' +
        '<hr class="my-12 border-gray-200">' +
        '<div class="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 bg-teal-50 rounded-xl px-6">' +
        '<div><p class="font-bold text-gray-900">Need plumbing help?</p><p class="text-gray-600 text-sm">Contact us for a free estimate today.</p></div>' +
        '<a href="/contact" class="btn-teal whitespace-nowrap">Get a Free Estimate</a></div></article>';
    }
    var loading = document.getElementById('blog-post-loading');
    if (loading) loading.classList.add('hidden');
  }

  function showPostNotFound() {
    var loading = document.getElementById('blog-post-loading');
    if (loading) loading.classList.add('hidden');
    var container = document.getElementById('blog-post-content');
    if (container) {
      container.innerHTML = '<div class="text-center py-16"><h2 class="heading-lg text-gray-900 mb-4">Post Not Found</h2>' +
        '<p class="text-gray-600 mb-8">The blog post you\'re looking for doesn\'t exist or has been moved.</p>' +
        '<a href="/blog" class="btn-teal">Browse All Posts</a></div>';
    }
  }

  function fetchPosts() {
    if (postsCache) return Promise.resolve(postsCache);
    return fetch('/data/posts.json').then(function (r) {
      if (!r.ok) throw new Error('Failed');
      return r.json();
    }).then(function (posts) {
      postsCache = posts.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
      return postsCache;
    });
  }

  function loadMarked() {
    if (window.marked) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form || form.getAttribute('data-handler-bound') === 'true') return;
    form.setAttribute('data-handler-bound', 'true');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('[name="name"]');
      var emailInput = form.querySelector('[name="email"]');
      var phoneInput = form.querySelector('[name="phone"]');
      var messageInput = form.querySelector('[name="message"]');
      var valid = true;
      clearFormErrors(form);
      if (!nameInput.value.trim()) { showFieldError(nameInput, 'Please enter your name.'); valid = false; }
      if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) { showFieldError(emailInput, 'Please enter a valid email.'); valid = false; }
      if (!phoneInput.value.trim()) { showFieldError(phoneInput, 'Please enter your phone number.'); valid = false; }
      if (!messageInput.value.trim()) { showFieldError(messageInput, 'Please enter a message.'); valid = false; }
      if (!valid) return;
      var submitBtn = form.querySelector('[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Sending...';
      submitBtn.disabled = true;
      var formData = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        body: new URLSearchParams(formData).toString()
      })
        .then(function (response) {
          if (response.ok) {
            form.parentElement.innerHTML = '<div class="text-center py-12"><div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div><h3 class="heading-md text-gray-900 mb-2">Thank You!</h3><p class="text-gray-600 mb-6">Your message has been sent. We\'ll respond within 24 hours.</p><a href="/" class="btn-teal">Back to Home</a></div>';
          } else { throw new Error('Failed'); }
        })
        .catch(function () {
          var notice = document.getElementById('form-error-notice');
          if (notice) { notice.classList.remove('hidden'); setTimeout(function () { notice.classList.add('hidden'); }, 5000); }
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  function showFieldError(input, message) {
    input.classList.add('!border-red-500', '!ring-red-500');
    var errorEl = document.createElement('p');
    errorEl.className = 'text-red-500 text-sm mt-1 form-error';
    errorEl.textContent = message;
    input.parentNode.appendChild(errorEl);
  }

  function clearFormErrors(form) {
    form.querySelectorAll('.form-error').forEach(function (el) { el.remove(); });
    form.querySelectorAll('.\\!border-red-500').forEach(function (el) { el.classList.remove('!border-red-500', '!ring-red-500'); });
  }

  // ============================= SHARED =============================
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#mobile-menu-btn');
    if (!btn) return;
    var menu = document.getElementById('mobile-menu');
    var iconOpen = document.getElementById('menu-icon-open');
    var iconClose = document.getElementById('menu-icon-close');
    if (!menu) return;
    var isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    if (iconOpen) iconOpen.classList.toggle('hidden');
    if (iconClose) iconClose.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', !isOpen);
  });

  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      var nav = document.querySelector('nav');
      if (nav) nav.classList.toggle('shadow-md', window.scrollY > 10);
      scrollTicking = false;
    });
  });

  var animObserver = null;
  if ('IntersectionObserver' in window) {
    animObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.style.opacity = '1';
          animObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  }

  function refreshAnimations() {
    if (!animObserver) return;
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.style.opacity = '0';
      animObserver.observe(el);
    });
  }

  function prefetchOnIdle() {
    if (postsCache) return;
    if ('requestIdleCallback' in window) requestIdleCallback(function () { fetchPosts(); });
    else setTimeout(function () { fetchPosts(); }, 2000);
  }

  function init() {
    renderFooter();
    navigate(location.pathname + location.hash, false);
    prefetchOnIdle();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
