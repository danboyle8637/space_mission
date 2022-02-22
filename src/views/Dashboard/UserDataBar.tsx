import styled from "styled-components";

import { BaseCard } from "../../components/cards/UserDashboardCard/BaseCard";
import { UserIdentityContent } from "../../components/cards/UserDashboardCard/UserIdentityContent";
import { UserMissionContent } from "../../components/cards/UserDashboardCard/UserMissionContent";
import { UserMissionStatsContent } from "../../components/cards/UserDashboardCard/UserMissionStatsContent";

const BarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: fit-content;
`;

export const UserDataBar = () => {
  return (
    <BarContainer>
      <BaseCard>
        <UserIdentityContent />
      </BaseCard>
      <BaseCard>
        <UserMissionContent />
      </BaseCard>
      <BaseCard>
        <UserMissionStatsContent />
      </BaseCard>
    </BarContainer>
  );
};
