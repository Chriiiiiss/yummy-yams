import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colorTheme } from "../../pages/constant";

interface IButtonWrapperProps {
  isBigButton?: boolean;
  color?: string;
  buttonTitle: string;
}

// Navigation container should contain maximum 4 buttons 2 big and 2 medium
const ButtonWrapper = styled.div<
  Pick<IButtonWrapperProps, "isBigButton" | "color">
>`
  height: 100%;
  width: 100%;
  background-color: var(${({ color }) => color || colorTheme.white.primary});
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
  filter: drop-shadow(0px 5px 0px var(${colorTheme.gray.secondary}));
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled.span<Pick<IButtonWrapperProps, "isBigButton">>`
  color: var(${colorTheme.white.primary});
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
