(function () {
  const C = window.SITE_CONFIG;

  const ICONS = {
    phone: '<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',
    email: '<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    menu: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
    chevronRight: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>',
    chevronDown: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>',
    mapPin: '<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    /** Footer / inline contact row — same visual weight as phone (stroke-2, 20px box) */
    clockSm: '<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    check: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',

    // Plumbing-specific icons
    emergency: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
    drain: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
    waterHeater: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"/></svg>',
    tankless: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    sewer: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>',
    leak: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>',
    pipe: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>',
    repiping: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    toilet: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
    faucet: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    sink: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 6v8a4 4 0 004 4h8a4 4 0 004-4V6M4 6l-2 2m18-2l2 2m-10 8v4"/></svg>',
    disposal: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
    sumpPump: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
    filter: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>',
    bathroom: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12h18M3 12v4a4 4 0 004 4h10a4 4 0 004-4v-4M3 12V8a4 4 0 014-4h1m0 0V3m0 1h2"/></svg>',
    kitchen: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>',
    commercial: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
    home: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
    gas: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/></svg>',
    frozen: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v18m-6-6l6 6 6-6M6 9l6-6 6 6M3 12h18"/></svg>',
    hydroJet: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    boiler: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',

    // Trust & UI icons
    shield: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    clock: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    star: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
    dollar: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    starFilled: '<svg class="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>',
    droplet: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21c-4.418 0-8-3.134-8-7 0-4.5 8-11 8-11s8 6.5 8 11c0 3.866-3.582 7-8 7z"/></svg>',
    wrench: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    truck: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>',

    // Social
    facebook: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    instagram: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    google: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>',
    yelp: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308c.376-.558 1.227-.36 1.326.308l.94 6.197zM16.793 17.39l-4.736-2.13c-.913-.41-.724-1.764.285-2.047l5.078-1.422c.673-.188 1.185.534.797 1.124l-3.424 4.475zM11.593 21.788l-.787-5.147c-.152-.996 1.097-1.56 1.888-.85l3.97 3.574c.528.476.13 1.347-.62 1.355l-4.45.068zM4.847 18.676l3.345-3.95c.645-.762 1.853-.222 1.826.816l-.135 5.22c-.018.693-.882.975-1.345.44l-3.691-4.526zM4.594 11.48l5.2.737c1.003.142 1.19 1.49.282 2.035L5.27 17.15c-.606.365-1.308-.204-1.093-.886l1.417-4.784z"/></svg>',
  };

  window.getIcon = function (name) {
    return ICONS[name] || ICONS.droplet || '';
  };

  function renderEmergencyBar() {
    return `
      <div class="emergency-ribbon">
        <div class="container-site flex items-center justify-center gap-3 flex-wrap">
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            <strong>24/7 Emergency Plumbing</strong> — Burst pipes? Flooding? We respond fast.
          </span>
          <a href="tel:${C.phoneRaw}" class="bg-white text-red-700 font-bold px-3 py-0.5 rounded-full text-xs hover:bg-red-50 transition-colors shadow-sm">
            Call ${C.phone}
          </a>
        </div>
      </div>`;
  }

  function renderTopBar() {
    return `
      <div class="bg-primary-950 text-primary-200 text-sm hidden sm:block">
        <div class="container-site flex items-center justify-between py-2">
          <div class="flex items-center gap-6">
            <a href="tel:${C.phoneRaw}" class="flex items-center gap-1.5 hover:text-white transition-colors">
              ${ICONS.phone} ${C.phone}
            </a>
            <a href="mailto:${C.email}" class="flex items-center gap-1.5 hover:text-white transition-colors">
              ${ICONS.email} ${C.email}
            </a>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1.5">
              ${ICONS.mapPin}
              <span>Serving ${C.address}</span>
            </div>
            <div class="flex items-center gap-2 border-l border-primary-800 pl-4">
              ${C.secondaryNav.map(item =>
                '<a href="' + item.url + '" class="hover:text-white transition-colors">' + item.label + '</a>'
              ).join('<span class="text-primary-700">|</span>')}
            </div>
          </div>
        </div>
      </div>`;
  }

  function buildServiceDropdown() {
    var cats = C.serviceCategories;
    var services = C.services;
    var html = '<div class="p-4 grid grid-cols-2 gap-1 max-h-96 overflow-y-auto">';
    services.forEach(function(s) {
      html += '<a href="/services/' + s.id + '" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">' +
        '<span class="w-5 h-5 flex-shrink-0 text-teal-600">' + (getIcon(s.icon) || '').replace(/w-8 h-8/g, 'w-5 h-5') + '</span>' +
        s.title + '</a>';
    });
    html += '</div>';
    html += '<div class="border-t border-gray-100 p-3"><a href="/services" class="block text-center text-sm font-semibold text-teal-600 hover:text-teal-700 py-1">View All Services →</a></div>';
    return html;
  }

  function buildAreasDropdown() {
    var locs = C.locations;
    var html = '<div class="p-4 space-y-1">';
    locs.forEach(function(loc) {
      html += '<a href="/service-areas/' + loc.slug + '" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">' +
        '<span class="w-4 h-4 text-teal-600">' + ICONS.mapPin.replace(/h-5 w-5/g, 'h-4 w-4') + '</span>' +
        loc.name + (loc.state ? ', ' + loc.state : '') + '</a>';
    });
    html += '</div>';
    html += '<div class="border-t border-gray-100 p-3"><a href="/service-areas" class="block text-center text-sm font-semibold text-teal-600 hover:text-teal-700 py-1">View All Areas →</a></div>';
    return html;
  }

  window.renderHeader = function (activePage) {
    var el = document.getElementById('site-header');
    if (!el) return;

    var navLinks = C.navigation.map(function(item) {
      var isActive = activePage === item.id;
      var activeClass = isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50';
      if (item.hasDropdown) {
        var dropdown = item.id === 'services' ? buildServiceDropdown() : buildAreasDropdown();
        return '<div class="relative group">' +
          '<a href="' + item.url + '" class="px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ' + activeClass + '">' +
          item.label + ' ' + ICONS.chevronDown + '</a>' +
          '<div class="nav-dropdown" style="width:480px">' + dropdown + '</div></div>';
      }
      return '<a href="' + item.url + '" class="px-3 py-2 text-sm font-medium rounded-md transition-colors ' + activeClass + '">' + item.label + '</a>';
    }).join('');

    var mobileLinks = C.navigation.map(function(item) {
      var isActive = activePage === item.id;
      var activeClass = isActive ? 'text-teal-600 bg-teal-50' : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50';
      return '<a href="' + item.url + '" class="block px-4 py-3 text-base font-medium border-b border-gray-100 transition-colors ' + activeClass + '">' + item.label + '</a>';
    }).join('');

    el.innerHTML = renderEmergencyBar() + renderTopBar() + `
      <nav class="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div class="container-site">
          <div class="flex items-center justify-between h-16 lg:h-20">
            <a href="/" class="flex items-center gap-3 group">
              <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-800 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-premium">
                <svg class="w-6 h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.418 0-8-3.134-8-7 0-4.5 8-11 8-11s8 6.5 8 11c0 3.866-3.582 7-8 7z"/></svg>
              </div>
              <div>
                <span class="text-lg lg:text-xl font-extrabold text-primary-900 tracking-tight">PrimeFlow</span>
                <span class="block text-xs text-teal-600 font-medium -mt-0.5 tracking-wide">PLUMBING</span>
              </div>
            </a>
            <div class="hidden lg:flex items-center gap-1">
              ${navLinks}
            </div>
            <div class="flex items-center gap-3">
              <a href="tel:${C.phoneRaw}" class="btn-teal hidden sm:inline-flex text-sm !px-4 !py-2">
                ${ICONS.phone} <span class="ml-1.5">Call Now</span>
              </a>
              <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Toggle menu" aria-expanded="false">
                <span id="menu-icon-open">${ICONS.menu}</span>
                <span id="menu-icon-close" class="hidden">${ICONS.close}</span>
              </button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" class="hidden lg:hidden border-t border-gray-100 bg-white max-h-[70vh] overflow-y-auto">
          ${mobileLinks}
          <div class="p-4 space-y-3">
            <a href="tel:${C.phoneRaw}" class="btn-teal w-full text-center">
              ${ICONS.phone} <span class="ml-1.5">Call ${C.phone}</span>
            </a>
            <a href="/services/emergency-plumbing" class="btn-emergency w-full text-center !animate-none">
              ${ICONS.emergency.replace(/w-8 h-8/g, 'w-5 h-5')} <span class="ml-1.5">Emergency Service</span>
            </a>
          </div>
        </div>
      </nav>`;
  };

  window.renderFooter = function () {
    var el = document.getElementById('site-footer');
    if (!el) return;

    var quickLinks = C.navigation.map(function(item) {
      return '<li><a href="' + item.url + '" class="text-gray-400 hover:text-teal-400 transition-colors">' + item.label + '</a></li>';
    }).join('');

    var serviceLinks = C.services.slice(0, 8).map(function(s) {
      return '<li><a href="/services/' + s.id + '" class="text-gray-400 hover:text-teal-400 transition-colors">' + s.title + '</a></li>';
    }).join('');

    var locationLinks = C.locations.map(function(loc) {
      return '<li><a href="/service-areas/' + loc.slug + '" class="text-gray-400 hover:text-teal-400 transition-colors">' + loc.name + '</a></li>';
    }).join('');

    var topAreas = C.serviceAreas.slice(0, 10).map(function(area) {
      return '<li class="text-gray-400">' + area + '</li>';
    }).join('');

    el.innerHTML = `
      <section class="bg-gradient-to-br from-primary-900 via-primary-800 to-teal-900 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
        </div>
        <div class="container-site relative py-16 sm:py-20 text-center">
          <h2 class="heading-lg text-white mb-4">Ready to Solve Your Plumbing Problem?</h2>
          <p class="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">Contact PrimeFlow Plumbing today for a free estimate. Our licensed plumbers are ready to help with any project, big or small.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:${C.phoneRaw}" class="btn-accent text-lg !px-8 !py-4">
              ${ICONS.phone} <span class="ml-2">Call ${C.phone}</span>
            </a>
            <a href="/contact" class="btn-outline-white text-lg !px-8 !py-4">
              Request a Free Estimate
            </a>
          </div>
        </div>
      </section>

      <footer class="bg-primary-950 text-white">
        <div class="container-site py-12 lg:py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            <div class="lg:col-span-1">
              <a href="/" class="inline-flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center text-white">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21c-4.418 0-8-3.134-8-7 0-4.5 8-11 8-11s8 6.5 8 11c0 3.866-3.582 7-8 7z"/></svg>
                </div>
                <div>
                  <span class="text-lg font-extrabold text-white">PrimeFlow</span>
                  <span class="block text-xs text-teal-400 font-medium -mt-0.5">PLUMBING</span>
                </div>
              </a>
              <p class="text-gray-400 text-sm mb-4">${C.description}</p>
              <div class="flex gap-3">
                <a href="${C.social.facebook}" class="w-9 h-9 bg-primary-900 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">${ICONS.facebook}</a>
                <a href="${C.social.instagram}" class="w-9 h-9 bg-primary-900 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">${ICONS.instagram}</a>
                <a href="${C.social.google}" class="w-9 h-9 bg-primary-900 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Google">${ICONS.google}</a>
                <a href="${C.social.yelp}" class="w-9 h-9 bg-primary-900 hover:bg-teal-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Yelp">${ICONS.yelp}</a>
              </div>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Quick Links</h3>
              <ul class="space-y-2.5 text-sm">${quickLinks}
                <li><a href="/faq" class="text-gray-400 hover:text-teal-400 transition-colors">FAQ</a></li>
                <li><a href="/financing" class="text-gray-400 hover:text-teal-400 transition-colors">Financing</a></li>
                <li><a href="/coupons" class="text-gray-400 hover:text-teal-400 transition-colors">Coupons & Offers</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Our Services</h3>
              <ul class="space-y-2.5 text-sm">${serviceLinks}
                <li><a href="/services" class="text-teal-400 hover:text-teal-300 font-medium transition-colors">View All →</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Service Areas</h3>
              <ul class="space-y-2.5 text-sm">${locationLinks}</ul>
            </div>

            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Contact Us</h3>
              <ul class="space-y-3 text-sm">
                <li class="flex items-start gap-3 text-gray-400">
                  <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">${ICONS.phone}</span>
                  <a href="tel:${C.phoneRaw}" class="min-w-0 leading-snug hover:text-white transition-colors">${C.phone}</a>
                </li>
                <li class="flex items-start gap-3 text-gray-400">
                  <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">${ICONS.email}</span>
                  <a href="mailto:${C.email}" class="min-w-0 break-all leading-snug hover:text-white transition-colors">${C.email}</a>
                </li>
                <li class="flex items-start gap-3 text-gray-400">
                  <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">${ICONS.mapPin}</span>
                  <span class="leading-snug">${C.address}</span>
                </li>
                <li class="flex items-start gap-3 text-gray-400">
                  <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">${ICONS.clockSm}</span>
                  <span class="text-xs leading-snug">${C.hours}</span>
                </li>
              </ul>
              <div class="mt-4 p-4 rounded-xl bg-gradient-to-br from-red-600 to-red-700 border border-red-400/50 shadow-lg shadow-red-950/40">
                <p class="text-red-100 text-xs font-semibold mb-1">24/7 Emergency Service</p>
                <a href="tel:${C.phoneRaw}" class="text-white font-bold text-base hover:text-red-100 transition-colors">${C.phone}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-primary-900">
          <div class="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; ${new Date().getFullYear()} ${C.companyName}. All rights reserved.</p>
            <p>Licensed & Insured | Serving Northeastern Pennsylvania with Pride</p>
          </div>
        </div>
      </footer>`;
  };

  window.renderStars = function (count) {
    return Array(count).fill(ICONS.starFilled).join('');
  };
})();
