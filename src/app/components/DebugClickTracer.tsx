"use client";

import { useEffect } from "react";

export default function DebugClickTracer(): null {
  useEffect(() => {
    // Log clicks and the event target
    const onClick = (e: MouseEvent) => {
      try {
        // eslint-disable-next-line no-console
        console.log('DebugClickTracer: click', {
          time: Date.now(),
          target: (e.target as HTMLElement)?.outerHTML?.slice?.(0, 200),
        });
      } catch {}
    };

    // Monkey-patch fetch to log requests
    const originalFetch = window.fetch;
    window.fetch = function (input: RequestInfo, init?: RequestInit) {
      try {
        // eslint-disable-next-line no-console
        console.log('DebugClickTracer: fetch', input);
      } catch {}
      // call fetch with the global/window as `this` to avoid illegal-invocation
      return originalFetch.call(window, input, init);
    } as unknown as typeof fetch;

    // Monkey-patch XHR
    const origXhrOpen = (window as any).XMLHttpRequest?.prototype?.open;
    const origXhrSend = (window as any).XMLHttpRequest?.prototype?.send;
    if (origXhrOpen && origXhrSend) {
      (window as any).XMLHttpRequest.prototype.open = function (method: any, url: any) {
        // eslint-disable-next-line no-console
        console.log('DebugClickTracer: XHR open', method, url);
        return origXhrOpen.apply(this, arguments as any);
      };
      (window as any).XMLHttpRequest.prototype.send = function () {
        // eslint-disable-next-line no-console
        console.log('DebugClickTracer: XHR send', this._url || '(unknown)');
        return origXhrSend.apply(this, arguments as any);
      };
    }

    // NOTE: Image.src setter patch removed — it was causing intrusive side-effects
    // and may trigger browser/devtool overlays. We rely on click/fetch/XHR logging only.

    const onVisibility = () => {
      try {
        // eslint-disable-next-line no-console
        console.log('DebugClickTracer: visibilitychange', document.visibilityState);
      } catch {}
    };

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      try {
        // eslint-disable-next-line no-console
        console.log('DebugClickTracer: beforeunload');
      } catch {}
    };

    window.addEventListener('click', onClick, true);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('beforeunload', onBeforeUnload);

    // Wrap WebSocket to capture HMR messages from Turbopack / Next dev client
    const OrigWebSocket = (window as any).WebSocket;
    let wrapped = false;
    if (OrigWebSocket && !(OrigWebSocket as any).__debug_traced) {
      const ProxyWS: any = function (url: any, protocols?: any) {
        const sock = protocols ? new OrigWebSocket(url, protocols) : new OrigWebSocket(url);
        try {
          sock.addEventListener('open', () => {
            // eslint-disable-next-line no-console
            console.log('DebugClickTracer: HMR WS open', url);
          });
          sock.addEventListener('message', (ev: MessageEvent) => {
            try {
              // eslint-disable-next-line no-console
              console.log('DebugClickTracer: HMR WS message', typeof ev.data === 'string' ? ev.data.slice(0, 200) : ev.data);
            } catch {}
          });
        } catch (err) {
          // ignore
        }
        return sock;
      };
      ProxyWS.prototype = OrigWebSocket.prototype;
      (ProxyWS as any).__debug_traced = true;
      (window as any).WebSocket = ProxyWS;
      wrapped = true;
    }

    // Wrap EventSource (used by some dev clients / HMR fallbacks)
    const OrigEventSource = (window as any).EventSource;
    let esWrapped = false;
    if (OrigEventSource && !(OrigEventSource as any).__debug_traced) {
      const ProxyES: any = function (url: any, settings?: any) {
        const es = new OrigEventSource(url, settings);
        try {
          es.addEventListener('message', (ev: MessageEvent) => {
            try {
              console.log('DebugClickTracer: EventSource message', url, typeof ev.data === 'string' ? ev.data.slice(0, 200) : ev.data);
            } catch {}
          });
          es.addEventListener('open', () => console.log('DebugClickTracer: EventSource open', url));
          es.addEventListener('error', (err: any) => console.log('DebugClickTracer: EventSource error', url, err));
        } catch (e) {}
        return es;
      };
      ProxyES.prototype = OrigEventSource.prototype;
      (ProxyES as any).__debug_traced = true;
      (window as any).EventSource = ProxyES;
      esWrapped = true;
    }

    // Cleanup
    return () => {
      window.removeEventListener('click', onClick, true);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.fetch = originalFetch;
  if (wrapped) (window as any).WebSocket = OrigWebSocket;
  if (esWrapped) (window as any).EventSource = OrigEventSource;
      if (origXhrOpen && origXhrSend) {
        (window as any).XMLHttpRequest.prototype.open = origXhrOpen;
        (window as any).XMLHttpRequest.prototype.send = origXhrSend;
      }
    };
  }, []);

  return null;
}
