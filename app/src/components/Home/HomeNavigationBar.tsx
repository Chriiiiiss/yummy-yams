import styled from "@emotion/styled";
import { Color, colorTheme } from "../../pages/constant";
import { NavigationButton } from "./NavigationButton";
import { useUserStore } from "../../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

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
  const { reset, isConnected } = useUserStore();
  const navigate = useNavigate();
  return (
    <div className="pixel-corners--wrapper">
      <WrapperNavigationBar>
        {isConnected ? (
          <NavigationButton
            index={0}
            color={Color.Blue}
            isBigButton={true}
            buttonTitle="Play"
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
        {isConnected ? (
          <NavigationButton
            index={1}
            color={Color.Yellow}
            buttonTitle="OPTION"
          />
        ) : (
          <NavigationButton index={1} isDisabled buttonTitle="OPTION" />
        )}

        <NavigationButton
          index={3}
          isBigButton={true}
          color={Color.Green}
          buttonTitle="Classement"
        />
      </WrapperNavigationBar>
    </div>
  );
};
