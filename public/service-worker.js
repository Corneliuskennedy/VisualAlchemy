// Octomatic Service Worker
// Version: 1.0.0

// Cache names
const STATIC_CACHE_NAME = 'octomatic-static-v1';
const DYNAMIC_CACHE_NAME = 'octomatic-dynamic-v1';
const IMAGE_CACHE_NAME = 'octomatic-images-v1';
const API_CACHE_NAME = 'octomatic-api-v1';

// Resources to cache immediately on install
const STATIC_ASSETS = [
  '/offline.html',
  '/manifest.json',
  '/faviconOctomatic.svg',
  '/octomaticFavicon.svg',
  '/octomaticLogo.svg',
  '/fonts/Archivo-Variable.woff2',
  '/fonts/Archivo-VariableFont_wdth,wght.ttf'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [
    STATIC_CACHE_NAME,
    DYNAMIC_CACHE_NAME,
    IMAGE_CACHE_NAME,
    API_CACHE_NAME
  ];

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            console.log('[Service Worker] Deleting old cache:', cacheToDelete);
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper function to determine cache strategy based on request
const getCacheStrategy = (request) => {
  const url = new URL(request.url);
  
  // API requests - network first, then cache
  if (url.pathname.includes('/api/')) {
    return {
      cacheName: API_CACHE_NAME,
      strategy: 'network-first',
      maxAge: 60 * 60 * 1000 // 1 hour
    };
  }
  
  // Image requests - cache first, then network
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
  ) {
    return {
      cacheName: IMAGE_CACHE_NAME,
      strategy: 'cache-first',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
  }
  
  // HTML requests - network first, then cache
  if (request.destination === 'document' || url.pathname.endsWith('/') || url.pathname === '') {
    return {
      cacheName: DYNAMIC_CACHE_NAME,
      strategy: 'network-first',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    };
  }
  
  // Navigation requests for SPA (handle routes like /services/*)
  if (request.mode === 'navigate' && !url.pathname.match(/\.[^\/]+$/)) {
    return {
      cacheName: DYNAMIC_CACHE_NAME,
      strategy: 'network-first',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    };
  }
  
  // CSS/JS/Fonts - cache first, then network
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(css|js|woff2|ttf)$/i)
  ) {
    return {
      cacheName: STATIC_CACHE_NAME,
      strategy: 'cache-first',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
  }
  
  // Default - network first
  return {
    cacheName: DYNAMIC_CACHE_NAME,
    strategy: 'network-first',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  };
};

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Skip Supabase API requests (handled by Supabase client)
  if (event.request.url.includes('supabase.co')) {
    return;
  }
  
  // Skip non-GET requests (POST, PUT, DELETE, etc.) - Cache API only supports GET
  if (event.request.method !== 'GET') {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Handle navigation requests for SPA
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If navigation fails, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Return offline page as last resort
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }
  
  const { cacheName, strategy, maxAge } = getCacheStrategy(event.request);
  
  if (strategy === 'cache-first') {
    // Cache-first strategy (for static assets)
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // Return cached response if available
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise fetch from network and cache
          return fetch(event.request)
            .then((networkResponse) => {
              // Cache the network response (only for GET requests)
              if (networkResponse.ok && event.request.method === 'GET') {
                const clonedResponse = networkResponse.clone();
                caches.open(cacheName)
                  .then((cache) => {
                    cache.put(event.request, clonedResponse);
                  });
              }
              return networkResponse;
            })
            .catch(() => {
              // If both cache and network fail, return offline page for HTML requests
              if (event.request.destination === 'document') {
                return caches.match('/offline.html');
              }
              return new Response('Network error', { status: 408 });
            });
        })
    );
  } else {
    // Network-first strategy (for dynamic content)
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // Cache the network response (only for GET requests)
          if (networkResponse.ok && event.request.method === 'GET') {
            const clonedResponse = networkResponse.clone();
            caches.open(cacheName)
              .then((cache) => {
                cache.put(event.request, clonedResponse);
              });
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails, try to return from cache
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // If both network and cache fail, return offline page for HTML requests
              if (event.request.destination === 'document') {
                return caches.match('/offline.html');
              }
              return new Response('Network error', { status: 408 });
            });
        })
    );
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(
      // Process stored form submissions when back online
      self.registration.getSync()
        .then((syncManager) => {
          // Implementation for handling offline form submissions
          console.log('[Service Worker] Syncing contact form submissions');
        })
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/octomaticLogo.svg',
    badge: '/octomaticFavicon.svg',
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // If a window is already open, focus it
        for (const client of clientList) {
          if (client.url === event.notification.data.url && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open a new window
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url);
        }
      })
  );
});
