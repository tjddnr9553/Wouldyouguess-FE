import './BoardItem.css'
import BoardAlignImg from '../assets/align-img.png'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const BoardItem = ({id, createdDate, title, content}) => {
  const nav = useNavigate();

  const goBoardPage = () => {
    nav(`/board/${id}`);
  }

  return (
    <div className='BoardItem'>
      <div className="BoardItem-left">
        <div className='img_section' onClick={goBoardPage}>
          <img src={BoardAlignImg} alt="align img" />
        </div>
        <div className="info_section" onClick={goBoardPage}>
          <span className='date'> {createdDate} </span> 
          <span className='tag'>{title}</span>
        </div>
      </div>
      <div className="button_section BoradItem-right">
        <Button text={'수정하기'} onClick={() => nav(`/edit/${id}`)}/>
      </div>
    </div>
  )
}

export default BoardItem;