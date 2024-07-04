import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';  // import the reset.css

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    outline: none;
  }

  body {
    width: 100%;
    height: 100%;
  }

  .inner {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 900px;
  }
  .inner::after {
    width: 100vw;
    height: 100vh;
    content: "";
    background-image: url('/images/background-img.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.8;
    z-index: -1;
    position: absolute;
    background-color: gray;
  }
`

export default GlobalStyles;