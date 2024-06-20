import './Editor.css'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

const Editor = ({onSubmit, initData}) => {
  const nav = useNavigate();

  const now = dayjs();
  const date = now.format("YYYY-MM-DD");
  
  const [input, setInput] = useState({
    createdDate: date,
    title : "",
    content: "",
  });
  
  useEffect(() => {
    if(initData) {
      setInput({
        ...initData,
      })
    }
  }, [initData])

  const onChangeInput = (e) => {
    // 이벤트가 발생한 객체의 속성 가져오기.
    let name = e.target.name;
    let value = e.target.value;

    setInput({
      ...input,
      [name]: value, // 새로운 속성을 추가할 땐 [] 사용할 것.  
    });
  }

  const onSubmitBtnClick = () => {
    onSubmit(input);
  };

  return (
    <div className='editor'> 
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input 
          name='createdDate'
          value={input.createdDate} //초기값!!!!!!!!!
          type="date"
          onChange={onChangeInput} />
      </section>
      <section className="title_section">
        <h4>게시물 제목</h4>
        <input 
          type="text"
          name='title'
          value={input.title}
          onChange={onChangeInput} />
      </section>
      <section className="contents_section">
        <h4>게시물 내용</h4>
        <textarea 
          name="content"
          value={input.content}
          placeholder='내용을 입력하세요.'
          onChange={onChangeInput}
          ></textarea>
      </section>
      <section className="editor_footer">
        <Button onClick={() => nav("/")} text={"취소하기"} />
        <Button text={"작성완료"} onClick={onSubmitBtnClick}/>
      </section>
    </div>
  )
}

export default Editor;