import '../styles/center.css'
import Editor from '../components/Editor';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { BoardDispatchContext } from '../App';
import { BoardStateContext } from '../App';
import useGetBoard from '../hooks/useBoard';

const Edit = () => {
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(BoardDispatchContext);
  const params = useParams();
  const curBoardItem = useGetBoard(params.id);

  const onClickDelete = () => {
    if(
      window.confirm("게시판을 정말 삭제하시겠습니까?")
    ) {
      onDelete(params.id); // 삭제할 게시물의 id는 params에 저장되어 있음
      nav("/", {replace: true});
    }
  }

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      // 순서를 꼭 지켜야 함!!
      onUpdate(
        params.id,
        input.createdDate,
        input.title,
        input.content,
      );
      nav("/", { replace: true });
    }
  };


  return (
    <div className="edit wrap_center">
      <Header 
        text={"게시물 수정"} 
        leftItem={
        <Button onClick={() => nav("/")} text={"< 뒤로 가기"} />} 
        rightItem={
          <Button onClick={onClickDelete} text={"삭제하기"} />
        }    
      />
      <Editor onSubmit={onSubmit} initData={curBoardItem}/>
    </div>
  )
}

export default Edit;