import { util } from "./util";

declare let self: ServiceWorkerGlobalScope;

// @ts-ignore
self.__WB_DISABLE_DEV_LOGS = true;

util();

const version = "0.0.10";
const userDBName = "user_database";
const statsDBName = "missionStats";
let userDBVersion = 1;
let userDB: IDBDatabase;
let missionStatsDB: IDBDatabase;

self.addEventListener("install", (event) => {});

self.addEventListener("activate", () => {});

self.addEventListener("fetch", async (event) => {
  const headers = event.request.headers;

  const url = new URL(event.request.url);
  const pathname = url.pathname;

  switch (pathname) {
    case "/_next/image": {
      if (
        url.toString().includes("mars") ||
        url.toString().includes("titan") ||
        url.toString().includes("astroid-mining-card") ||
        url.toString().includes("black-hole-card") ||
        url.toString().includes("pleiades")
      ) {
        event.respondWith(
          caches.open("mission-images").then((cache) => {
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
            });
          })
        );
      } else {
        return event.respondWith(fetch(event.request));
      }
      break;
    }
    case "/get-user": {
      event.respondWith(
        caches.open("user-doc").then((cache) => {
          return cache.match(event.request).then((res) => {
            if (res) {
              return res;
            } else {
              return fetch(event.request).then(async (res) => {
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
    case "/api/login": {
      event.respondWith(
        fetch(event.request).then(async (res) => {
          if (res) {
            const clonedRes = res.clone();

            const resData = await clonedRes.json();
            const userDoc = resData.userDoc;

            if (!userDoc) {
              return res;
            } else {
              const newRes = new Response(JSON.stringify(userDoc));

              const newReq = new Request("/get-user", { method: "GET" });

              caches
                .open("user-doc")
                .then((cache) => {
                  cache.put(newReq, newRes);

                  return res;
                })
                .catch(() => {
                  return res;
                });
            }
          }

          return res;
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

      return fetch(event.request).then(async (res) => {
        const clonedRes = res.clone();

        // Create new response
        const resData = await clonedRes.json();
        const userDoc = resData.userDoc;

        const newRes = new Response(JSON.stringify(userDoc));

        const newReq = new Request("/get-user", {
          method: "GET",
        });

        caches.delete("user-doc").then((res) => {
          if (res) {
            caches.open("user-doc").then((cache) => {
              cache.put(newReq, newRes);
            });
            return res;
          } else {
            return res;
          }
        });
      });
      break;
    }
    case "/cancel-mission": {
      const shouldUpdateUserCache = headers.get("should-update-user-cache");

      if (shouldUpdateUserCache !== "true") {
        const response = new Response("Error updating user record", {
          status: 404,
        });
        return event.respondWith(response);
      }

      return fetch(event.request).then(async (res) => {
        const clonedRes = res.clone();

        // Create new response
        const resData = await clonedRes.json();
        const userDoc = resData.userDoc;

        const newRes = new Response(JSON.stringify(userDoc));

        const newReq = new Request("/get-user", {
          method: "GET",
        });

        caches.delete("user-doc").then((res) => {
          if (res) {
            caches.open("user-doc").then((cache) => {
              cache.put(newReq, newRes);
            });
            return res;
          } else {
            return res;
          }
        });
      });
      break;
    }
    case "/handle-mission-stats/create-stats-doc": {
    }
    case "/handle-mission-stats/add-new-stats-doc": {
    }
    case "/handle-mission-stats/get-stats-doc": {
    }
    case "/handle-mission-stats/update-stats-doc": {
      const res = await fetch(event.request);

      const clonedRes = res.clone();

      const resData = await clonedRes.json();
      const statsDoc = resData.statsDoc;

      console.log(statsDoc);

      const testStats = {
        missionId: "mars",
        goals: statsDoc,
      };

      if (indexedDB) {
        const dbRequest = indexedDB.open(statsDBName, 1);

        dbRequest.onsuccess = () => {
          missionStatsDB = dbRequest.result;

          const transaction = missionStatsDB.transaction(
            "missionStats",
            "readwrite"
          );

          transaction.oncomplete = () => {
            console.log("Transaction complete");
          };

          const statsStore = transaction.objectStore("missionStats");
          const addToDB = statsStore.add(testStats);

          console.log(addToDB);
        };

        dbRequest.onerror = () => {
          // Not sure what to do yet.
        };

        dbRequest.onupgradeneeded = () => {
          missionStatsDB = dbRequest.result;
          const store = missionStatsDB.createObjectStore("missionStats", {
            keyPath: "missionId",
          });

          store.createIndex("missionId", "missionId", { unique: true });
        };
      }

      return res;
    }
    default: {
      return event.respondWith(fetch(event.request));
    }
  }
});
