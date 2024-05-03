import styled from "@emotion/styled";
import { theme } from "../../pages/constant";
import { NavigationButton } from "./NavigationButton";

const WrapperNavigationBar = styled.div`
  background-color: var(${theme.gray});
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
          color={theme.blue}
          buttonTitle="Play"
        />
        <NavigationButton color={theme.yellow} buttonTitle="OPTION" />
        <NavigationButton color={theme.red} buttonTitle="Quit" />
        <NavigationButton
          isBigButton={true}
          color={theme.green}
          buttonTitle="Collection"
        />
      </WrapperNavigationBar>
    </div>
  );
};
