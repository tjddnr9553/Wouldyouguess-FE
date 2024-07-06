import './Lobby.css'
import styled from "styled-components";

import GameMode from "../../components/lobby/GameMode.jsx";
import PlayerSidebar from "./PlayerSidebar.jsx";
import Button from '../../components/button/Button.jsx';
import Plante from '../../components/game/Planet.jsx'
import Header from '../../components/game/Header.jsx';

const textList = [
  {
    id: 'game1',
    text: "재미있는 라이어 게임 입니다.",
  },
  {
    id: 'game2',
    text: "재미있는 틀린 부분 찾기 입니다.",
  },
  {
    id: 'game3',
    text: "아주아주 재밌는 game3 입니다.",
  },
]

const Lobby = () => {
  
  return (
    <div className="inner">
      <div className="lobby container">

        <Header />

        <div className="content">
          <div className="side">
            <PlayerSidebar />
          </div>

          <div className="game-content">
            <Plante style={{top:'10%'}} id={'planet4'} min={5} max={15} text={textList[0].text}/>
            <Plante style={{bottom:'5%', left:'30%'}} id={'planet2'} min={5} max={25} text={textList[1].text} />
            <Plante style={{right:'12%'}} id={'planet5'} min={5} max={20} text={textList[2].text} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Lobby;