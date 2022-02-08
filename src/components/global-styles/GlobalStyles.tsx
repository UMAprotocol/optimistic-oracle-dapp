import { Global, css } from "@emotion/react";
import { reset } from "./reset";

export const typography = css`
  /* only take latin chars to reduce bundle size */
  @font-face {
    font-family: "Halyard";
    src: url("/fonts/HalyardDisplay-Regular.woff2") format("woff2"),
      url("/fonts/HalyardDisplay-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: "Halyard";
    src: url("/fonts/HalyardDisplayMedium-Regular.woff2") format("woff2"),
      url("/fonts/HalyardDisplayMedium-Regular.woff") format("woff");

    font-weight: 500;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: "Halyard";
    src: url("/fonts/HalyardDisplaySemiBold-Regular.woff2") format("woff2"),
      url("/fonts/HalyardDisplaySemiBold-Regular.woff") format("woff");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
`;
const variables = css`
  :root {
  }
`;

const globalStyles = css`
  ${reset};
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    line-height: 1.5;
    font-family: "Halyard", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
  }
  html,
  body {
    height: 100%;
  }
  body {
  }
  #root {
    height: 100%;
    isolation: isolate;
  }

  ${typography}
  ${variables}
`;

const GlobalStyles = () => <Global styles={globalStyles} />;
export default GlobalStyles;
