import styled from "styled-components";

import { text16 } from "../../../../styles/typography";
import { ActionButton } from "../../../buttons/ActionButton";
import { endpoints } from "../../../../utils/endpoints";
import { userStore } from "../../../../../lib/userStore";
import { missionStatsStore } from "../../../../../lib/missionStatsStore";
import { MissionId, UserDoc } from "../../../../types";
import {
  ActivateMissionUserDocBody,
  ActivateMissionStatsDocBody,
} from "../../../../types/network";

interface StartMissionProps {
  missionId: MissionId;
}

const Container = styled.div`
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 20px;
  justify-items: center;
  width: 100%;
`;

const MissionText = styled.p`
  ${text16}
  color: #f8f8f8;
`;

export const StartMission: React.FC<StartMissionProps> = ({ missionId }) => {
  const { activeMission, setUserDoc } = userStore((state) => ({
    activeMission: state.activeMission,
    setUserDoc: state.setUser,
  }));

  const setStatsDoc = missionStatsStore((state) => state.setStatsDoc);

  const handleStartMission = () => {
    const activateMission = async () => {
      const userUrl = `${process.env.NEXT_PUBLIC_API_DEV_URL}/${endpoints.ACTIVATE_MISSION}`;
      const statsUrl = `${process.env.NEXT_PUBLIC_API_DEV_URL}/${endpoints.HANDLE_STATS_DOC}/create-stats-doc`;

      const userBody: ActivateMissionUserDocBody = {
        missionId: missionId,
      };

      const statsBody: ActivateMissionStatsDocBody = {
        missionId: missionId,
        goals: {
          isGoal1Complete: false,
          isGoal2Complete: false,
          isGoal3Complete: false,
        },
      };

      const useDocResponse = await fetch(userUrl, {
        method: "POST",
        headers: {
          "should-update-user-cache": "true",
          userId: "123456",
        },
        body: JSON.stringify(userBody),
      });

      const createStatsDoc = await fetch(statsUrl, {
        method: "POST",
        headers: {
          userId: "123456",
        },
        body: JSON.stringify(statsBody),
      });

      const userData = await useDocResponse.json();

      const statsData = await createStatsDoc.json();

      if (!useDocResponse.ok) {
        // Show toaster that activating the mission did not work... try again.
      }

      if (!createStatsDoc.ok) {
        // Show toaster that mission stats doc was not created and they need to try again.
      }

      const userDoc: UserDoc = userData.userDoc;
      setUserDoc(userDoc);

      const goals = statsData.statsDoc;
      setStatsDoc({
        missionId: missionId,
        goals: goals,
      });
    };

    // You also want to create the stats doc

    if (missionId !== null) {
      activateMission();
    }
  };

  return (
    <Container>
      <MissionText>Do You Want This Mission?</MissionText>
      <ActionButton
        handleClick={handleStartMission}
        isDisabled={activeMission !== ""}
      >
        {activeMission !== "" ? "You're Out On A Mission" : "Activate Mission"}
      </ActionButton>
    </Container>
  );
};
