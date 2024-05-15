import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Color, colorTheme } from "../../pages/constant";

interface IButtonWrapperProps {
  isBigButton?: boolean;
  color?: Color;
  buttonTitle: string;
  index: number;
  onClick?: () => void;
  isDisabled?: boolean;
}

// Navigation container should contain maximum 4 buttons 2 big and 2 medium
const ButtonWrapper = styled.div<
  Pick<IButtonWrapperProps, "isBigButton" | "color">
>`
  height: 100%;
  width: 100%;
  background-color: var(
    ${({ color }) =>
      color ? colorTheme[color].primary : colorTheme.white.secondary}
  );
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(
      ${({ color }) => {
        if (color) {
          return colorTheme[color].secondary
            ? colorTheme[color].secondary
            : colorTheme[color].primary;
        } else {
          return colorTheme.white.secondary;
        }
      }}
    );
  }
`;

const ButtonDropShadowWrapper = styled.button<
  Pick<IButtonWrapperProps, "isBigButton" | "index" | "isDisabled">
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
  filter: ${({ index, isDisabled }) =>
    index > 2 && !isDisabled
      ? css`drop-shadow(-2px 5px 0px var(${colorTheme.gray.secondary}))`
      : css`drop-shadow(0px 5px 0px var(${colorTheme.gray.secondary}))`};
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: ${({ index, isDisabled }) => {
      if (isDisabled) {
        return css`translateY(0px)`;
      }
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
    filter: drop-shadow(0px 0px 0px var(${colorTheme.gray.secondary}));
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
  onClick = () => {},
  isDisabled = false,
}: IButtonWrapperProps) => {
  return (
    <ButtonDropShadowWrapper
      onClick={onClick}
      index={index}
      isBigButton={isBigButton}
      isDisabled={isDisabled}
    >
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
