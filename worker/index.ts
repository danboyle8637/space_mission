import { util } from "./util";

declare let self: ServiceWorkerGlobalScope;

// @ts-ignore
self.__WB_DISABLE_DEV_LOGS = true;

util();

self.addEventListener("fetch", (event) => {
  const headers = event.request.headers;

  const url = new URL(event.request.url);
  const pathname = url.pathname;

  switch (pathname) {
    case "/get-user": {
      event.respondWith(
        caches.open("user-doc").then((cache) => {
          return cache.match(event.request).then((res) => {
            if (res) {
              return res;
            } else {
              return fetch(event.request).then((res) => {
                const clonedRes = res.clone();
                cache.put(event.request, clonedRes);
                return res;
              });
            }
          }) as PromiseLike<Response>;
        })
      );
      break;
    }
    case "/activate-mission": {
      const shouldUpdateUserCache = headers.get("should-update-user-cache");

      if (shouldUpdateUserCache !== "true") {
        const response = new Response("Error updating user record", {
          status: 404,
        });
        return event.respondWith(response);
      }

      return fetch(event.request).then((res) => {
        const clonedRes = res.clone();
        caches.delete("user-doc").then((res) => {
          if (res) {
            caches.open("user-doc").then((cache) => {
              cache.put(event.request, clonedRes);
            });
            return res;
          } else {
            return res;
          }
        });
      });
    }
    default: {
      return event.respondWith(fetch(event.request));
    }
  }
});
