import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';  // import the reset.css

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    outline: none;
  }

  body {
    width: 100vw;
    height: 100vh;

    background-image: url('/images/background-img.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .inner {
    min-width: 900px;
    height: 100vh;
    width: 100vw;
    
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
  }

  .container {
    width: 100vw;
    height: 100vh;
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

export default GlobalStyles;