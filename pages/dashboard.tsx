import { useEffect } from "react";
import { GetStaticProps } from "next";

import { DashboardView } from "../src/views/Dashboard";
import { missionsStore } from "../lib/missionsStore";
import { endpoints } from "../src/utils/endpoints";
import { DashboardViewProps } from "../src/types/views";
import { MissionDoc } from "../src/types";

const Dashboard: React.FC<DashboardViewProps> = ({ missions }) => {
  const setMissions = missionsStore((state) => state.setMissions);

  useEffect(() => {
    if (missions.length > 0) {
      const request = new Request("/get-missions", {
        method: "GET",
      });

      const missionsRes = new Response(JSON.stringify(missions));

      caches.delete("missions").then((res) => {
        if (res) {
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
        }
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

  const missionsArray: MissionDoc[] = await resData.json();

  console.log(missionsArray);

  return {
    props: {
      missions: missionsArray,
    },
  };
};

export default Dashboard;
