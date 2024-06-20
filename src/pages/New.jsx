import Header from "../components/Header";
import Editor from "../components/Editor";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import '../styles/center.css'
import { useContext } from "react";
import { BoardDispatchContext } from '../App'

const New = () => {
  const nav = useNavigate();
  const {onCreate} = useContext(BoardDispatchContext);

  const onSubmit = (input) => {
    onCreate(
      input.createdDate,
      input.title,
      input.content,
    );
    nav("/", {replace: true});
  }

  return (
    <div className="new wrap_center">
      <Header text={"게시물 등록"} leftItem={<Button onClick={() => nav("/")} text={"< 뒤로 가기"}/>}/>
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New;