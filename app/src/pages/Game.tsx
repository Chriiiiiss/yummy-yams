import styled from "@emotion/styled";
import { Title } from "../components/Title";

import { useFetchGame, useGameStore } from "../hooks/useGame";
import { useUserStore } from "../hooks/useAuth";
import { useEffect } from "react";

import { Dice } from "../components/Dice.tsx";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 200px;
`;

const DiceContainer = styled.div`
  display: flex;
`;

export const Game = () => {
  const { currentPartyId } = useUserStore();
  const { setGameId, setShotLeft, setIsWon, setPrizeWon } = useGameStore();
  const { data, isLoading } = useFetchGame(currentPartyId);

  useEffect(() => {
    if (data) {
      setGameId(data.id);
      setShotLeft(data.shotLeft);
      setIsWon(data.isWon);
      setPrizeWon(data.prizeWon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return isLoading ? (
    <p>Is Loading</p>
  ) : (
    <AppWrapper>
      <Title children={data?.shotLeft} fontSize="80" isHomeTitle></Title>
      <DiceContainer>
        <Dice />
      </DiceContainer>
    </AppWrapper>
  );
};
