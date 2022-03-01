import { useEffect } from "react";
import styled from "styled-components";

import { BaseCard } from "../../components/cards/UserDashboardCard/BaseCard";
import { UserIdentityContent } from "../../components/cards/UserDashboardCard/UserIdentityContent";
import { UserMissionContent } from "../../components/cards/UserDashboardCard/UserMissionContent";
import { UserMissionStatsContent } from "../../components/cards/UserDashboardCard/UserMissionStatsContent";
import { UserDoc } from "../../types";
import { userStore } from "../../../lib/userStore";
import { networkStore } from "../../../lib/networkStore";
import { endpoints } from "../../utils/endpoints";
import { getErrorMessage } from "../../utils/utilityFunctions";

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

  const { setErrorMessage, toggleErrorToaster } = networkStore((state) => ({
    setErrorMessage: state.setErrorMessage,
    toggleErrorToaster: state.toggleErrorToaster,
  }));

  useEffect(() => {
    const getUser = async () => {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_API_DEV_URL
          : process.env.NEXT_PUBLIC_API_URL;
      const url = `${baseUrl}/${endpoints.GET_USER}`;

      try {
        const userResponse = await fetch(url, {
          method: "GET",
        });

        const userData: UserDoc = await userResponse.json();

        setUser(userData);
      } catch (error) {
        setErrorMessage(
          "Error Getting User In Data Bar",
          getErrorMessage(error)
        );
        toggleErrorToaster();
      }
    };

    if (userId.length === 0 || !userId) {
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
