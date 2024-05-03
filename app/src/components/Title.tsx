import styled from "@emotion/styled";
import { ReactNode } from "react";
import { colorTheme } from "../pages/constant";
import { css } from "@emotion/react";

interface ITitleProps {
  children: ReactNode;
  fontSize?: string;
  isHomeTitle?: boolean;
}

const TitleTypography = styled.h1<
  Pick<ITitleProps, "fontSize" | "isHomeTitle">
>`
  font-family: "Balatro";
  color: var(${colorTheme.white.primary});
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "18")}px;
  ${({ isHomeTitle }) =>
    isHomeTitle
      ? css`
          -webkit-text-stroke-width: 2px;
          -webkit-text-stroke-color: var(${colorTheme.gray.secondary});
        `
      : null}
`;

export const Title = ({
  children,
  fontSize,
  isHomeTitle = false,
}: ITitleProps) => {
  return (
    <div>
      <TitleTypography fontSize={fontSize} isHomeTitle={isHomeTitle}>
        {children}
      </TitleTypography>
    </div>
  );
};
