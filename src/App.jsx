import {Route, Routes} from 'react-router-dom'
import './App.css'
import GlobalStyles from './styles/GlobalStyles'

import Lobby from './pages/lobby/Lobby.jsx'
import Game1 from './pages/game1/Game1.jsx'
import Home from './pages/home/Home.jsx'
import Game2 from "./pages/game2/Game2.jsx";
import Game3 from "./pages/game3/Game3.jsx";
import Result from "./pages/result/Result.jsx";
import Login from "./pages/oauth/Login.jsx";
import Loading from './components/loading/Loading.jsx'
import Temp from './pages/Temp.jsx'

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/game1' element={<Game1 />} />
        <Route path='/game2' element={<Game2 />} />
        <Route path='/game3' element={<Game3 />} />
        <Route path='/result' element={<Result />} />
        <Route path='/loading' element={<Loading />} />
        <Route path='/temp' element={<Temp />} />
      </Routes>
    </>
  )
}

export default App
