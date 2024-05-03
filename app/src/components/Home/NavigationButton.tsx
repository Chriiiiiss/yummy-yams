import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Color, colorTheme } from "../../pages/constant";

interface IButtonWrapperProps {
  isBigButton?: boolean;
  color: Color;
  buttonTitle: string;
  index: number;
}

// Navigation container should contain maximum 4 buttons 2 big and 2 medium
const ButtonWrapper = styled.div<
  Pick<IButtonWrapperProps, "isBigButton" | "color">
>`
  height: 100%;
  width: 100%;
  background-color: var(
    ${({ color }) => colorTheme[color].primary || colorTheme.white.primary}
  );
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(
      ${({ color }) =>
        colorTheme[color].secondary
          ? colorTheme[color].secondary
          : colorTheme[color].primary}
    );
  }
`;

const ButtonDropShadowWrapper = styled.div<
  Pick<IButtonWrapperProps, "isBigButton" | "index">
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
  filter: ${({ index }) =>
    index > 2
      ? css`drop-shadow(-2px 5px 0px var(${colorTheme.gray.secondary}))`
      : css`drop-shadow(0px 5px 0px var(${colorTheme.gray.secondary}))`};
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: ${({ index }) => {
      switch (index) {
        case 0:
          return css`translateY(4px) translateX(4px)`;
        case 1:
          return css`translateY(4px)`;
        case 2:
          return css`translateY(4px)`;
        case 3:
          return css`translateY(4px) translateX(-4px)`;
      }
    }};
    filter: drop-shadow(0px 0px 0px #000000);
  }
`;

const ButtonTitle = styled.span<Pick<IButtonWrapperProps, "isBigButton">>`
  color: var(${colorTheme.white.primary});
  font-family: "Balatro";
  font-size: ${({ isBigButton }) => (isBigButton ? css`40px` : css`32px`)};
  user-select: none;
`;

export const NavigationButton = ({
  isBigButton = false,
  color,
  buttonTitle,
  index,
}: IButtonWrapperProps) => {
  return (
    <ButtonDropShadowWrapper index={index} isBigButton={isBigButton}>
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
