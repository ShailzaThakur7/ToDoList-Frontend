import { useEffect, useState } from 'react'
import ToDo from './Frontend/components/ToDo.jsx'
import { addToDo, getAllToDo, updateToDo,deleteToDo } from './utils/HandleApi.jsx'

function App() {
  console.log("Component rendered");
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState([])
  const [isupdating, setisupdating] = useState(false)
  const [toDoId, setToDoId] = useState("")

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  

  const updateMode = (_id, text) => {
    console.log("Update mode activated", _id, text);
    setisupdating(true);
    setText(text);
    setToDoId(_id);
  };
  
  
  return (
    <>
      <div className='App'>
        <div className='container'>
          <h1>ToDo App</h1>
          <div className='top'>
            <input type='text' placeholder='Add your task' value={text} onChange={(e) => setText(e.target.value)} />

            <div
  className='add'
  onClick={() => {
    console.log("Update button clicked");
    if (isupdating) {
      updateToDo(toDoId, text, setToDo, setText, setisupdating);
    } else {
      addToDo(text, setText, setToDo);
    }
  }}
>
  {isupdating ? "Update" : "Add"}
</div>



          </div>

          <div className='list'>

            {toDo.map((item) => <ToDo
            key={item._id}
             text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={()=>deleteToDo(item._id,setToDo)}/>)}

          </div>
        </div>

      </div>
    </>
  )
}

export default App
