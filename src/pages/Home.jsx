import Button from "../components/Button";
import Header from "../components/Header";
import BoardList from "../components/BoardList";
import '../styles/center.css'
import { useContext, useState } from "react";
import {BoardStateContext} from '../App'

const Home = () => {

  return (
    <div className="home wrap_center">
      <Header text={'채윤이의 게시판'}></Header>
      <BoardList></BoardList>
    </div>
  )
}

export default Home;