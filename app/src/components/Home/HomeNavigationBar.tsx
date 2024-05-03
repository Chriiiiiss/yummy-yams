import styled from "@emotion/styled";
import { colorTheme } from "../../pages/constant";
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
          isBigButton={true}
          color={colorTheme.blue.primary}
          buttonTitle="Play"
        />
        <NavigationButton
          color={colorTheme.yellow.primary}
          buttonTitle="OPTION"
        />
        <NavigationButton color={colorTheme.red.primary} buttonTitle="Quit" />
        <NavigationButton
          isBigButton={true}
          color={colorTheme.green.primary}
          buttonTitle="Collection"
        />
      </WrapperNavigationBar>
    </div>
  );
};
