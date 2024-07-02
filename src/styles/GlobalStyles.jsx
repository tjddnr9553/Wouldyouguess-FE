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
    background-color: gray;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 900px;
  }
`

export default GlobalStyles;