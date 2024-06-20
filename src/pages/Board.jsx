import '../styles/center.css'
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import './Board.css'
import useGetBoard from '../hooks/useBoard';

const Board = () => {
  const params = useParams();
  const nav = useNavigate();
  const curBoardItem = useGetBoard(params.id);

  if(!curBoardItem) {
    return <div>데이터 로딩 중</div>
  }

  const title = dayjs().format("YYYY-MM-DD");

  return (
    <div className="board wrap_center">
      <Header 
      text={`${curBoardItem.createdDate} 기록`}
      leftItem={<Button 
        text={"< 뒤로 가기"} 
        onClick={() => { nav("/", {replace: true}) }}/>}
      rightItem={
        <Button onClick={() => {nav(`/edit/${params.id}`)}} text={"수정하기"} />}
      />
      <section className="content_section">
        <h4>{curBoardItem.title}</h4>
        <div className="content_viewer">
          <p>{curBoardItem.content}</p>
        </div>
      </section>
    </div>
  )
}

export default Board;