"use client";

import { useEffect } from 'react';

// Development helper: unregister service workers and clear caches for localhost.
// Run only when the page is served from a local host to avoid touching production.
export default function UnregisterDevServiceWorkers() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const host = window.location.hostname;
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
      if (!isLocal) return;

      // unregister any service workers scoped to this origin
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) => {
          regs.forEach((reg) => {
            try {
              console.info('[DevSW] unregistering', reg.scope);
              reg.unregister();
            } catch (e) {
              console.warn('[DevSW] unregister failed', e);
            }
          });
        }).catch((e) => console.warn('[DevSW] getRegistrations failed', e));
      }

      // clear all CacheStorage entries for this origin
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((k) => {
            caches.delete(k).then((ok) => {
              if (ok) console.info('[DevSW] cache deleted', k);
            });
          });
        }).catch((e) => console.warn('[DevSW] caches.keys failed', e));
      }
    } catch (err) {
      console.warn('[DevSW] error', err);
    }
  }, []);

  return null;
}
