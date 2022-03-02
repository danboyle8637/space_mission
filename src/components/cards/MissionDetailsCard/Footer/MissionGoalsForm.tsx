import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { GoalCheckbox } from "../../../forms/GoalCheckbox";
import { GoalCheckboxFake } from "../../../forms/GoalCheckboxFake";
import { userStore } from "../../../../../lib/userStore";
import { missionStatsStore } from "../../../../../lib/missionStatsStore";
import { endpoints } from "../../../../utils/endpoints";
import { MissionId } from "../../../../types";

interface GoalsFormProps {
  missionId: MissionId;
}

const GoalForm = styled.form`
  padding: 0 20px 20px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

export const MissionGoalsForm: React.FC<GoalsFormProps> = ({ missionId }) => {
  const { userId, activeMission, getUserId } = userStore((state) => ({
    userId: state.userId,
    activeMission: state.activeMission,
    getUserId: state.getUserFromMagic,
  }));

  const { isGoal1Complete, isGoal2Complete, isGoal3Complete, setStatsDoc } =
    missionStatsStore((state) => ({
      isGoal1Complete: state.isGoal1Complete,
      isGoal2Complete: state.isGoal2Complete,
      isGoal3Complete: state.isGoal3Complete,
      setStatsDoc: state.setStatsDoc,
    }));

  useEffect(() => {
    if (userId === "") {
      getUserId();
    }
  }, [userId === ""]);

  const handleUpdateMissionStats = async (name: string, value: boolean) => {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_DEV_URL
        : process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl}/${endpoints.HANDLE_STATS_DOC}/update-stats-doc`;

    if (userId === "") {
      getUserId();
    }

    const updateStatsBody = {
      missionId: missionId,
      goals: {
        isGoal1Complete: name === "missionGoal1" ? value : isGoal1Complete,
        isGoal2Complete: name === "missionGoal2" ? value : isGoal2Complete,
        isGoal3Complete: name === "missionGoal3" ? value : isGoal3Complete,
      },
    };

    const statsRes = await fetch(url, {
      method: "POST",
      headers: {
        userId: userId,
      },
      body: JSON.stringify(updateStatsBody),
    });

    const statsData = await statsRes.json();
    setStatsDoc({
      ...statsData.statsDoc,
    });
  };

  return (
    <GoalForm>
      <GoalCheckboxFake
        name="missionGoal1"
        label="Complete Goal 1"
        isChecked={isGoal1Complete}
        handleUpdateMissionStats={handleUpdateMissionStats}
        isDisabled={false}
      />
      <GoalCheckboxFake
        name="missionGoal2"
        label="Complete Goal 2"
        isChecked={isGoal2Complete}
        handleUpdateMissionStats={handleUpdateMissionStats}
        isDisabled={!isGoal1Complete}
      />
      <GoalCheckboxFake
        name="missionGoal3"
        label="Complete Goal 3"
        isChecked={isGoal3Complete}
        handleUpdateMissionStats={handleUpdateMissionStats}
        isDisabled={!isGoal1Complete || !isGoal2Complete}
      />
    </GoalForm>
  );
};
