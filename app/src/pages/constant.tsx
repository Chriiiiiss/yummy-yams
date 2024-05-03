export enum Color {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow",
  White = "white",
  Gray = "gray",
}

export type ColorDefinition = {
  primary: string;
  secondary?: string;
};

export type Theme<T extends string> = {
  [Key in T]: ColorDefinition;
};

export const colorTheme: Theme<Color> = {
  [Color.Red]: {
    primary: "--color-theme-red",
    secondary: "--color-theme-red-secondary",
  },
  [Color.Blue]: {
    primary: "--color-theme-blue",
    secondary: "--color-theme-blue-secondary",
  },
  [Color.Green]: {
    primary: "--color-theme-green",
    secondary: "--color-theme-green-secondary",
  },
  [Color.Yellow]: {
    primary: "--color-theme-yellow",
  },
  [Color.White]: {
    primary: "--color-theme-white",
  },
  [Color.Gray]: {
    primary: "--color-theme-gray",
    secondary: "--color-theme-gray-secondary",
  },
};
