import'./BoardList.css'
import Button from './Button';
import BoardItem from './BoardItem';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BoardStateContext } from '../App';

const BoardList = () => {
  const nav = useNavigate();
  const data = useContext(BoardStateContext);

  return (
    <div>
      <div className="menu_bar">
        <select >
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button onClick={() => nav("/new")} text={'새 게시판 작성'}/>
      </div>
        {data.map((item) => (
          <BoardItem key={item.id} {...item} />
        ))}
    </div>
  )
}

export default BoardList;