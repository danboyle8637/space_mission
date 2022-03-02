import styled from "styled-components";

import { text16 } from "../../../../styles/typography";
import { ActionButton } from "../../../buttons/ActionButton";
import { endpoints } from "../../../../utils/endpoints";
import { userStore } from "../../../../../lib/userStore";
import { missionStatsStore } from "../../../../../lib/missionStatsStore";
import { networkStore } from "../../../../../lib/networkStore";
import { getErrorMessage } from "../../../../utils/utilityFunctions";
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
  const { userId, activeMission, setUserDoc, getUserId } = userStore(
    (state) => ({
      userId: state.userId,
      activeMission: state.activeMission,
      setUserDoc: state.setUser,
      getUserId: state.getUserFromMagic,
    })
  );

  const setStatsDoc = missionStatsStore((state) => state.setStatsDoc);

  const { setErrorMessage, toggleErrorToaster } = networkStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    toggleErrorToaster: state.toggleErrorToaster,
  }));

  const handleStartMission = () => {
    const activateMission = async () => {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_API_DEV_URL
          : process.env.NEXT_PUBLIC_API_URL;

      const userUrl = `${baseUrl}/${endpoints.ACTIVATE_MISSION}`;
      const statsUrl = `${baseUrl}/${endpoints.HANDLE_STATS_DOC}/create-stats-doc`;

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

      try {
        if (userId === "") {
          getUserId();
        }

        const useDocResponse = await fetch(userUrl, {
          method: "POST",
          headers: {
            "should-update-user-cache": "true",
            userId: userId,
          },
          body: JSON.stringify(userBody),
        });

        const createStatsDoc = await fetch(statsUrl, {
          method: "POST",
          headers: {
            userId: userId,
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
          ...goals,
        });
      } catch (error) {
        setErrorMessage("Start Mission Error", getErrorMessage(error));
        toggleErrorToaster();
      }
    };

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
