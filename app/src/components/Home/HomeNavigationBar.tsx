import styled from "@emotion/styled";
import { Color, colorTheme } from "../../pages/constant";
import { NavigationButton } from "./NavigationButton";

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
  return (
    <div className="pixel-corners--wrapper">
      <WrapperNavigationBar>
        <NavigationButton
          index={0}
          isBigButton={true}
          color={Color.Blue}
          buttonTitle="Play"
        />
        <NavigationButton index={1} color={Color.Yellow} buttonTitle="OPTION" />
        <NavigationButton index={2} color={Color.Red} buttonTitle="Quit" />
        <NavigationButton
          index={3}
          isBigButton={true}
          color={Color.Green}
          buttonTitle="Collection"
        />
      </WrapperNavigationBar>
    </div>
  );
};
