import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { GoalCheckbox } from "../../../forms/GoalCheckbox";
import { missionStatsStore } from "../../../../../lib/missionStatsStore";

const GoalForm = styled.form`
  padding: 0 20px 20px 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

export const MissionGoalsForm = () => {
  const {
    isGoal1Complete,
    isGoal2Complete,
    isGoal3Complete,
    updateInputValue,
  } = missionStatsStore((state) => ({
    isGoal1Complete: state.goals.isGoal1Complete,
    isGoal2Complete: state.goals.isGoal2Complete,
    isGoal3Complete: state.goals.isGoal3Complete,
    updateInputValue: state.updateInputValue,
  }));

  const updateStatsDoc = useCallback(() => {
    if (isGoal1Complete) {
      console.log("Hit api and update stats: ", isGoal1Complete);
    }
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
