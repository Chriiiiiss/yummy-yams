import styled from "@emotion/styled";
import { Title } from "../components/Title";
import { useNavigate } from "@tanstack/react-router";
import { useFetchGame, useGameStore, useLaunchDice } from "../hooks/useGame";
import { useUserStore } from "../hooks/useAuth";
import { useEffect } from "react";
import { NavigationButton } from "../components/Home/NavigationButton";
import { Color } from "./constant";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 200px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 50vw;
  height: 13vh;
  justify-content: center;
`;

export const Game = () => {
  const { currentPartyId } = useUserStore();
  const { setGameId, setShotLeft, setIsWon, setPrizeWon, shotLeft } =
    useGameStore();
  const { data, isLoading } = useFetchGame(currentPartyId);
  const navigate = useNavigate();
  const launchDice = useLaunchDice();

  const handleLaunchDice = () => {
    launchDice.mutate({ diceArray: [1, 2, 3, 4, 5] });
  };

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
      <button
        onClick={() => {
          navigate({ to: "/" });
        }}
      >
        Retour
      </button>
      <ButtonWrapper>
        {shotLeft ? (
          <NavigationButton
            color={Color.Blue}
            index={2}
            buttonTitle="Launch Dice"
            onClick={handleLaunchDice}
          />
        ) : (
          <NavigationButton
            isDisabled={true}
            index={2}
            buttonTitle="Launch Dice"
          />
        )}
      </ButtonWrapper>
    </AppWrapper>
  );
};
