import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    main: string;
    alternate: string;
    blue: string;
    lightBlue: string;
    blueShadow: string;
    yellow: string;
    lightYellow: string;
    yellowShadow: string;
    font: string;
    fontBold: string;
  }
}
