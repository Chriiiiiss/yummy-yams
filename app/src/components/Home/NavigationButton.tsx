import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { theme } from "../../pages/constant";

interface IButtonWrapperProps {
  isBigButton?: boolean;
  color?: theme;
  buttonTitle: string;
}

// Navigation container should contain maximum 4 buttons 2 big and 2 medium
const ButtonWrapper = styled.div<
  Pick<IButtonWrapperProps, "isBigButton" | "color">
>`
  height: 100%;
  width: 100%;
  background-color: var(${({ color }) => color || theme.white});
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(81px 15px 0px #000000);
`;

const ButtonDropShadowWrapper = styled.div<
  Pick<IButtonWrapperProps, "isBigButton">
>`
  ${({ isBigButton }) =>
    isBigButton
      ? css`
          width: 30%;
        `
      : css`
          width: 20%;
        `}
  height: 80%;
  filter: drop-shadow(0px 5px 0px var(${theme.grayDark}));
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled.span<Pick<IButtonWrapperProps, "isBigButton">>`
  color: var(${theme.white});
  font-family: "Balatro";
  font-size: ${({ isBigButton }) => (isBigButton ? css`40px` : css`32px`)};
`;

export const NavigationButton = ({
  isBigButton = false,
  color,
  buttonTitle,
}: IButtonWrapperProps) => {
  return (
    <ButtonDropShadowWrapper isBigButton={isBigButton}>
      <ButtonWrapper
        className="pixelated-buttons"
        isBigButton={isBigButton}
        color={color}
      >
        <ButtonTitle isBigButton={isBigButton}>
          {buttonTitle.toUpperCase()}
        </ButtonTitle>
      </ButtonWrapper>
    </ButtonDropShadowWrapper>
  );
};
