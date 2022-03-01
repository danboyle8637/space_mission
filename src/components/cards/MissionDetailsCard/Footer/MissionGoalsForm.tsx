import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { GoalCheckbox } from "../../../forms/GoalCheckbox";
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
  const {
    isGoal1Complete,
    isGoal2Complete,
    isGoal3Complete,
    updateInputValue,
    setStatsDoc,
  } = missionStatsStore((state) => ({
    isGoal1Complete: state.goals.isGoal1Complete,
    isGoal2Complete: state.goals.isGoal2Complete,
    isGoal3Complete: state.goals.isGoal3Complete,
    updateInputValue: state.updateInputValue,
    setStatsDoc: state.setStatsDoc,
  }));

  const updateStatsDoc = useCallback(() => {
    const updateMissionStats = async () => {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_API_DEV_URL
          : process.env.NEXT_PUBLIC_API_URL;
      const url = `${baseUrl}/${endpoints.HANDLE_STATS_DOC}/update-stats-doc`;

      const updateStatsBody = {
        missionId: missionId,
        goals: {
          isGoal1Complete: isGoal1Complete,
          isGoal2Complete: isGoal2Complete,
          isGoal3Complete: isGoal3Complete,
        },
      };

      const statsRes = await fetch(url, {
        method: "POST",
        body: JSON.stringify(updateStatsBody),
      });

      const statsData = await statsRes.json();
      setStatsDoc({
        missionId: missionId,
        goals: statsData.statsDoc,
      });
    };

    updateMissionStats();
  }, [isGoal1Complete, isGoal2Complete, isGoal3Complete]);

  useEffect(() => {
    if (isGoal1Complete) {
      updateStatsDoc();
    }
  }, [isGoal1Complete, isGoal2Complete, isGoal3Complete]);

  return (
    <GoalForm>
      <GoalCheckbox
        name="missionGoal1"
        label="Complete Goal 1"
        isChecked={isGoal1Complete}
        updateInputValue={updateInputValue}
        isDisabled={false}
      />
      <GoalCheckbox
        name="missionGoal2"
        label="Complete Goal 2"
        isChecked={isGoal2Complete}
        updateInputValue={updateInputValue}
        isDisabled={!isGoal1Complete}
      />
      <GoalCheckbox
        name="missionGoal3"
        label="Complete Goal 3"
        isChecked={isGoal3Complete}
        updateInputValue={updateInputValue}
        isDisabled={!isGoal1Complete || !isGoal2Complete}
      />
    </GoalForm>
  );
};
