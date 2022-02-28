/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "util": () => (/* binding */ util)
/* harmony export */ });
function util() {
  console.log("From Util file...");
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

// @ts-ignore
self.__WB_DISABLE_DEV_LOGS = true;
(0,_util__WEBPACK_IMPORTED_MODULE_0__.util)();
const version = "0.0.10";
const userDBName = "user_database";
const statsDBName = "missionStats";
let userDBVersion = 1;
let userDB;
let missionStatsDB;
self.addEventListener("install", event => {});
self.addEventListener("activate", () => {});
self.addEventListener("fetch", async event => {
  const headers = event.request.headers;
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  switch (pathname) {
    case "/_next/image":
      {
        if (url.toString().includes("mars") || url.toString().includes("titan") || url.toString().includes("astroid-mining-card") || url.toString().includes("black-hole-card") || url.toString().includes("pleiades")) {
          event.respondWith(caches.open("mission-images").then(cache => {
            return cache.match(event.request).then(res => {
              if (res) {
                return res;
              } else {
                return fetch(event.request).then(res => {
                  const clonedRes = res.clone();
                  cache.put(event.request, clonedRes);
                  return res;
                });
              }
            });
          }));
        } else {
          return event.respondWith(fetch(event.request));
        }

        break;
      }

    case "/get-user":
      {
        event.respondWith(caches.open("user-doc").then(cache => {
          return cache.match(event.request).then(res => {
            if (res) {
              return res;
            } else {
              return fetch(event.request).then(async res => {
                const clonedRes = res.clone();
                cache.put(event.request, clonedRes);
                return res;
              });
            }
          });
        }));
        break;
      }

    case "/api/login":
      {
        event.respondWith(fetch(event.request).then(async res => {
          if (res) {
            const clonedRes = res.clone();
            const resData = await clonedRes.json();
            const userDoc = resData.userDoc;

            if (!userDoc) {
              return res;
            } else {
              const newRes = new Response(JSON.stringify(userDoc));
              const newReq = new Request("/get-user", {
                method: "GET"
              });
              caches.open("user-doc").then(cache => {
                cache.put(newReq, newRes);
                return res;
              }).catch(() => {
                return res;
              });
            }
          }

          return res;
        }));
        break;
      }

    case "/activate-mission":
      {
        const shouldUpdateUserCache = headers.get("should-update-user-cache");

        if (shouldUpdateUserCache !== "true") {
          const response = new Response("Error updating user record", {
            status: 404
          });
          return event.respondWith(response);
        }

        return fetch(event.request).then(async res => {
          const clonedRes = res.clone(); // Create new response

          const resData = await clonedRes.json();
          const userDoc = resData.userDoc;
          const newRes = new Response(JSON.stringify(userDoc));
          const newReq = new Request("/get-user", {
            method: "GET"
          });
          caches.delete("user-doc").then(res => {
            if (res) {
              caches.open("user-doc").then(cache => {
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

    case "/cancel-mission":
      {
        const shouldUpdateUserCache = headers.get("should-update-user-cache");

        if (shouldUpdateUserCache !== "true") {
          const response = new Response("Error updating user record", {
            status: 404
          });
          return event.respondWith(response);
        }

        return fetch(event.request).then(async res => {
          const clonedRes = res.clone(); // Create new response

          const resData = await clonedRes.json();
          const userDoc = resData.userDoc;
          const newRes = new Response(JSON.stringify(userDoc));
          const newReq = new Request("/get-user", {
            method: "GET"
          });
          caches.delete("user-doc").then(res => {
            if (res) {
              caches.open("user-doc").then(cache => {
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

    case "/handle-mission-stats/create-stats-doc":
      {}

    case "/handle-mission-stats/add-new-stats-doc":
      {}

    case "/handle-mission-stats/get-stats-doc":
      {}

    case "/handle-mission-stats/update-stats-doc":
      {
        const res = await fetch(event.request);
        const clonedRes = res.clone();
        const resData = await clonedRes.json();
        const statsDoc = resData.statsDoc;
        console.log(statsDoc);
        const testStats = {
          missionId: "mars",
          goals: statsDoc
        };

        if (indexedDB) {
          const dbRequest = indexedDB.open(statsDBName, 1);

          dbRequest.onsuccess = () => {
            missionStatsDB = dbRequest.result;
            const transaction = missionStatsDB.transaction("missionStats", "readwrite");

            transaction.oncomplete = () => {
              console.log("Transaction complete");
            };

            const statsStore = transaction.objectStore("missionStats");
            const addToDB = statsStore.add(testStats);
            console.log(addToDB);
          };

          dbRequest.onerror = () => {// Not sure what to do yet.
          };

          dbRequest.onupgradeneeded = () => {
            missionStatsDB = dbRequest.result;
            const store = missionStatsDB.createObjectStore("missionStats", {
              keyPath: "missionId"
            });
            store.createIndex("missionId", "missionId", {
              unique: true
            });
          };
        }

        return res;
      }

    default:
      {
        return event.respondWith(fetch(event.request));
      }
  }
});
})();

/******/ })()
;