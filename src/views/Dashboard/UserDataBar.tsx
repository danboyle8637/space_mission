import { useEffect } from "react";
import styled from "styled-components";

import { BaseCard } from "../../components/cards/UserDashboardCard/BaseCard";
import { UserIdentityContent } from "../../components/cards/UserDashboardCard/UserIdentityContent";
import { UserMissionContent } from "../../components/cards/UserDashboardCard/UserMissionContent";
import { UserMissionStatsContent } from "../../components/cards/UserDashboardCard/UserMissionStatsContent";
import { UserDoc } from "../../types";
import { userStore } from "../../../lib/userStore";
import { endpoints } from "../../utils/endpoints";

const BarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: fit-content;
`;

export const UserDataBar = () => {
  const { userId, setUser } = userStore((state) => ({
    userId: state.userId,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const getUser = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_DEV_URL}/${endpoints.GET_USER}`;

      const userResponse = await fetch(url, {
        method: "GET",
        headers: {
          userId: "123456",
        },
      });

      const userData: UserDoc = await userResponse.json();

      setUser(userData);
    };

    if (userId.length === 0) {
      getUser();
    }
  }, [userId]);

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
