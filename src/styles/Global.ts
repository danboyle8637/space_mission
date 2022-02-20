import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  :root {
    --base-blue: #1A1A2E;
    --dark-blue: #0F0F1A;
    --accent-pink: #B983FF;
    --accent-purple: #94B3FD;
    --accent-blue: #94DAFF;
    --accent-teal: #99FEFF;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    background: var(--base-blue);
    width: 100%;
    height: 100%;
  }

  section {
    margin: 0;
    padding: 0;
  }

  h1 {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 40px;
  }

  h3, h4, h5 {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  p {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  button {
    margin: 0;
    padding: 0;
  }

`;

export default Global;
