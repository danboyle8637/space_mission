import { useEffect } from "react";
import { GetStaticProps } from "next";

import { DashboardView } from "../src/views/Dashboard";
import { missionsStore } from "../lib/missionsStore";
import { endpoints } from "../src/utils/endpoints";
import { DashboardViewProps } from "../src/types/views";

const Dashboard: React.FC<DashboardViewProps> = ({ missions }) => {
  const setMissions = missionsStore((state) => state.setMissions);

  // useEffect(() => {
  //   if (window.indexedDB) {
  //     const db = indexedDB.open("missions");

  //     db.onupgradeneeded = () => {
  //       const missionsDb = db.result;
  //       const store = missionsDb.createObjectStore("missions", {
  //         keyPath: "missionId",
  //       });
  //       const missionIdIndex = store.createIndex("by_missionId", "missionId", {
  //         unique: true,
  //       });

  //       store.put(missions);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (missions) {
      const request = new Request("https://fww.live/get-missions", {
        method: "GET",
      });

      const missionsRes = new Response(JSON.stringify(missions));

      caches.open("missions").then((cache) => {
        return cache.match(request).then((res) => {
          if (res) {
            return;
          } else {
            cache.put(request, missionsRes);
            return;
          }
        });
      });

      setMissions(missions);
    }
  }, [missions]);

  return <DashboardView missions={missions} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const url =
    process.env.NODE_ENV === "production"
      ? process.env.API_URL
      : process.env.API_DEV_URL;

  const resData = await fetch(`${url}/${endpoints.GET_MISSIONS}`, {
    method: "GET",
  });

  const missionsArray = await resData.json();

  return {
    props: {
      missions: missionsArray,
    },
  };
};

export default Dashboard;
