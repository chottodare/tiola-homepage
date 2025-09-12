const CACHE_NAME = 'tiola-bookmarks-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap',
  'https://weatherwidget.io/js/widget.min.js'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS.map(url => {
          return new Request(url, { mode: 'no-cors' });
        })).catch(err => {
          console.log('Service Worker: Error caching some assets', err);
          // Cache individual files that work
          return Promise.all(
            STATIC_CACHE_URLS.map(url => {
              return cache.add(url).catch(error => {
                console.log('Failed to cache:', url, error);
              });
            })
          );
        });
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Otherwise, fetch from network
        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response for caching
          const responseToCache = response.clone();

          // Cache the new response for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, return offline page for HTML requests
        if (event.request.destination === 'document') {
          return caches.match('/offline.html') || 
                 new Response('App is offline. Your bookmarks are still available!', {
                   headers: { 'Content-Type': 'text/html' }
                 });
        }
        
        // For other requests, return a generic offline response
        return new Response('Offline content not available', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', event => {
  if (event.tag === 'bookmark-sync') {
    event.waitUntil(
      // Here you could sync bookmarks or other data when online
      console.log('Service Worker: Background sync triggered')
    );
  }
});

// Listen for messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Push notification support (for future use)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: 'icon-192x192.png',
      badge: 'icon-72x72.png',
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});