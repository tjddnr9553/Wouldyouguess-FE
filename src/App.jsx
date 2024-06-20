import { 
  createContext, 
  useReducer, 
  useRef, 
  useState,
  useEffect 
} from 'react'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import New from './pages/New'
import Edit from './pages/Edit'
import { Route, Routes, json } from 'react-router-dom'
import dayjs from 'dayjs'
import Board from './pages/Board'

// context 생성. 이 context는 edit과 new에 내려줄 것임.
// 이 context에는 날짜,제목,게시물 내용을 담은 객체를 저장할 것임.

export const BoardStateContext = createContext();
export const BoardDispatchContext = createContext();

// action: dispatch의 인자값.
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id)
          ? action.data
          : item
      );
      break;
    }
    case "DELETE":{
      nextState = state.filter(
        (item) => String(item.id) !== String(action.id)
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("board", JSON.stringify(nextState));
  return nextState;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  //useReducer를 사용해서 컴포넌트 외부에 상태 관리 코드 분리하기.
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("board");
    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) { //배열인지 아닌지 확인
      setIsLoading(false);
      return;
    }

    // key 값으로 넘겨줄 id가 중복되지 않기 위해 max id 찾기.
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id;
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 게시판 글 추가 생성
  const onCreate = (createdDate, title, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        title,
        content,
      }
    }) 
  }

  const onUpdate = (id, createdDate, title, content) => {
    dispatch({
      type:"UPDATE",
      data: {
        id, 
        createdDate,
        title,
        content,
      }
    })
  }

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if(isLoading) {
    return <div>데이터 로딩 중입니다. </div>
  }
  return (
    <>
      <BoardStateContext.Provider value={data}>
        <BoardDispatchContext.Provider 
        value={{
          onCreate,
          onDelete,
          onUpdate,
        }}>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/new' element={<New/>} />
            <Route path='/edit/:id' element={<Edit/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/board/:id' element={<Board/>} />
          </Routes>
        </BoardDispatchContext.Provider>
      </BoardStateContext.Provider>
    </>
  )
}

export default App
