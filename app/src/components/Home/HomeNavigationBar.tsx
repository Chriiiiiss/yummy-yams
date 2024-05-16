import styled from "@emotion/styled";
import { Color, colorTheme } from "../../pages/constant";
import { NavigationButton } from "./NavigationButton";
import { useUserStore } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useLaunchGame } from "../../hooks/useGame";

const WrapperNavigationBar = styled.div`
  background-color: var(${colorTheme.gray.primary});
  width: 80vw;
  height: 15vh;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 0 15px 0 15px;
`;

export const HomeNavigationBar = () => {
  const { reset, isConnected, token, partyLeft } = useUserStore();
  const launchGame = useLaunchGame();
  const navigate = useNavigate();
  return (
    <div className="pixel-corners--wrapper">
      <WrapperNavigationBar>
        {isConnected && token ? (
          <NavigationButton
            index={0}
            color={partyLeft ? Color.Blue : undefined}
            isBigButton={true}
            buttonTitle="Play"
            onClick={() => {
              launchGame.mutate({ token: token });
            }}
          />
        ) : (
          <NavigationButton
            isDisabled
            index={0}
            isBigButton={true}
            buttonTitle="Play"
          />
        )}

        {isConnected ? (
          <NavigationButton
            onClick={() => {
              reset();
            }}
            index={2}
            color={Color.Red}
            buttonTitle="Logout"
          />
        ) : (
          <NavigationButton
            onClick={() => {
              navigate({ to: "/login" });
            }}
            index={2}
            color={Color.Red}
            buttonTitle="Login"
          />
        )}
        {!isConnected ? (
          <NavigationButton
            index={1}
            color={Color.Yellow}
            buttonTitle="Register"
            onClick={() => {
              navigate({ to: "/register" });
            }}
          />
        ) : (
          <NavigationButton index={1} isDisabled buttonTitle="Register" />
        )}

        <NavigationButton
          index={3}
          isBigButton={true}
          color={Color.Green}
          buttonTitle="Classement"
          onClick={() => navigate({ to: "/ranking" })}
        />
      </WrapperNavigationBar>
    </div>
  );
};
