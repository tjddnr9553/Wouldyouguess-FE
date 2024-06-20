import { useEffect, useContext, useState } from "react";
import { BoardStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useGetBoard = (id) => {
  const data = useContext(BoardStateContext);
  const [curBoardItem, setCurBoardItem] = useState();
  const nav = useNavigate();
  
  useEffect(() => {
    const currentBoardItem = data.find(
      (item) => String(item.id) === String(id)
    );
    
    if(!currentBoardItem) {
      window.alert("존재하지 않는 게시물임!!!");
      nav("/", {replace: true});
    }
  
    setCurBoardItem(currentBoardItem);
  }, [id, data])

  return curBoardItem;
}

export default useGetBoard;