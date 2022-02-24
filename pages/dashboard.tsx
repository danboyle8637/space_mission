import { useEffect } from "react";
import { GetStaticProps } from "next";

import { DashboardView } from "../src/views/Dashboard";
import { endpoints } from "../src/utils/endpoints";
import { DashboardViewProps } from "../src/types/views";

const Dashboard: React.FC<DashboardViewProps> = ({ missions }) => {
  useEffect(() => {
    if (window.indexedDB) {
      const db = indexedDB.open("missions");

      db.onupgradeneeded = () => {
        const missionsDb = db.result;
        const store = missionsDb.createObjectStore("missions", {
          keyPath: "missionId",
        });
        const missionIdIndex = store.createIndex("by_missionId", "missionId", {
          unique: true,
        });

        store.put(missions);
      };
    }
  }, []);

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
