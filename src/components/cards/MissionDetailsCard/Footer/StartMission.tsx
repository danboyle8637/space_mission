import styled from "styled-components";

import { text16 } from "../../../../styles/typography";
import { ActionButton } from "../../../buttons/ActionButton";
import { endpoints } from "../../../../utils/endpoints";
import { userStore } from "../../../../../lib/userStore";
import { MissionId, UserDoc } from "../../../../types";

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
  const setUserDoc = userStore((state) => state.setUser);

  const handleStartMission = () => {
    const activateMission = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_DEV_URL}/${endpoints.ACTIVATE_MISSION}`;

      const body = {
        missionId: missionId,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "should-update-user-cache": "true",
          userId: "123456",
        },
        body: JSON.stringify(body),
      });

      const resData = await response.json();

      if (!response.ok) {
        // Show toaster that activating the mission did not work... try again.
      }

      const userDoc: UserDoc = resData.userDoc;
      setUserDoc(userDoc);
    };

    // You also want to create the stats doc

    activateMission();
  };

  return (
    <Container>
      <MissionText>Do You Want This Mission?</MissionText>
      <ActionButton handleClick={handleStartMission}>
        Accept Mission
      </ActionButton>
    </Container>
  );
};
