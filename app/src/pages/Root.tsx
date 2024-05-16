import { useEffect } from "react";
import { useGetUserData, useUserStore } from "../hooks/useAuth";
import styled from "@emotion/styled";
import ScanLineFilterImage from "/scan-line-filter.png";
import BackgroundBalatroImage from "/background-balatro.jpg";
import CrtFilterImage from "/crt-filter.png";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${BackgroundBalatroImage});
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
`;

const CrtFilter = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(${CrtFilterImage});
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  mix-blend-mode: multiply;
  z-index: 100;
  pointer-events: none;
  opacity: 0.5;
`;

const ScanLineFilter = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url(${ScanLineFilterImage});
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  mix-blend-mode: multiply;
  z-index: 99;
  pointer-events: none;
  opacity: 0.5;
`;

export const Root = () => {
  const {
    setIsConnected,
    token,
    setUsername,
    setPartyLeft,
    setPrizeWon,
    setCurrentPartyId,
  } = useUserStore();
  const { data } = useGetUserData(token);

  useEffect(() => {
    if (data) {
      setIsConnected(true);
      setUsername(data.username);
      setPartyLeft(data.partyLeft);
      setPrizeWon(data.prizesWon);
      setCurrentPartyId(data.currentPartyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <AppWrapper>
      <Toaster position="top-center" />
      <CrtFilter />
      <ScanLineFilter />
      <Outlet />
      <TanStackRouterDevtools />
    </AppWrapper>
  );
};
