export enum theme {
  red = "--color-theme-red",
  redDark = "--color-theme-red-secondary",
  blue = "--color-theme-blue",
  blueDark = "--color-theme-blue-secondary",
  green = "--color-theme-green",
  yellow = "--color-theme-yellow",
  white = "--color-theme-white",
  gray = "--color-theme-gray",
  grayDark = "--color-theme-gray-secondary",
}

export type TUpper<T extends string> = Uppercase<T>;
