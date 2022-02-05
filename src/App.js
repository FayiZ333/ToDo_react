import './App.css';
import React, { useState,useEffect } from 'react';

function App() {

  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [edit, setEdit] = useState(false)
  const [choose, setChoose] = useState('Active')

  useEffect(() => {
    getLocal();
  }, []);

  useEffect(() => {
    saveLocal();
  }, [toDos])

  function adTask(){
    if (edit){
      setToDos(
        toDos.map((obj)=>{
          if (obj.edit){
            return {...obj, text: toDo, edit: false}
          }return obj;
        })
      )
    }else{
      setToDos([...toDos,{id:Date.now() ,text: toDo , status: false}])
    }
    setToDo('')
    setEdit(false)
  }

  const taskStatus = (obj)=>{
    setToDos(
      toDos.map((obj2)=>{
        if (obj2.id === obj.id){
          return {...obj2, status: !obj2.status}
        }return obj2;
      })
    )
  }

  const cancel = ()=>{
    setToDos(
      toDos.map((obj)=>{
        if (obj.edit){
          return {...obj, edit: false}
        }return obj;
      })
    )
    setEdit(false)
    setToDo('')
  }
  
  const editTask = (obj)=>{
    setToDos(
      toDos.map((obj2)=>{
        if (obj2.id === obj.id){
          setEdit(true)
          return {...obj2, edit:true}
        }return obj2;
      })
    )
    setToDo(obj.text)
  }

  const saveLocal = ()=> {
    localStorage.setItem('toDos', JSON.stringify(toDos))
  };
  
  const getLocal = () => {
    if (localStorage.getItem('toDos') === null){
      localStorage.setItem('toDos',JSON.stringify([]));
    }else{
      let toDoLocal = JSON.parse(localStorage.getItem('toDos'));
      setToDos(toDoLocal)
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div>
              <div className="app">
                <div className="row bar">
                <button className={ choose === 'All' ? "btn btn-outline-secondary input2 active" : "btn btn-outline-secondary input2 "} onClick={()=>setChoose('All')} >All</button>
                <button className={ choose === 'Active' ? "btn btn-outline-secondary input2 active" : "btn btn-outline-secondary input2 "} onClick={()=>setChoose('Active')} >Active</button>
                <button className={ choose === 'Completed' ? "btn btn-outline-secondary input2 active" : "btn btn-outline-secondary input2 "} onClick={()=>setChoose('Completed')} >Completed</button>
                </div>
                <div className="input">
               
                 <input onChange={(e)=>setToDo(e.target.value)} value={toDo} type="text" placeholder="Add Task..." /> 
                </div>
                
                { edit ? 
                <div>
                  <button className="btn btn-outline-info input1" onClick={ toDo && toDo[0] !== " " ? adTask : null }>
                  {toDo && toDo[0] !== " " ? "Update":"Write Something"}</button>
                  <button className="btn btn-outline-danger input1" onClick={cancel}>Cancel</button>
                </div>
                :<button className="btn btn-outline-secondary input1" onClick={ toDo && toDo[0] !== " " ? adTask : null }>
                {toDo && toDo[0] !== " " ? "Add":"Write Something"}
                </button>}

                {toDos.map((obj,index)=>{
                  if (choose === "Active" ){
                    if (obj.status === false){
                    return(
                          
                        <div className="todos">
                            <div className="todo">
                            <div className="left">
                            <i className="fas fa-check" style={obj.status ? {color:'lightgreen'} : {color:'lightblue'}} 
                            onClick={()=>{taskStatus(obj)}}></i>
                                
                              <b  className="ml-3 text1" style={obj.status ? {color:'lightgreen'} : null} >{obj.status ? <del>{obj.text}</del> : obj.text }</b>
                            </div>
                            {edit === false ?
                            <div className="right">
                                <i className="fas fa-pencil" onClick={()=>editTask(obj)} ></i>&nbsp;
          
                                <i className="fas fa-trash" onClick={(e)=>setToDos(toDos.filter((obj2)=> obj2.id !== obj.id))}></i>
                            </div>
                            :null}
                            </div>
                        </div>
                      
                    )}}
                  else if(choose === "Completed"){
                    if (obj.status === true){
                      return(
                          
                      <div className="todos">
                          <div className="todo">
                          <div className="left">
                          <i className="fas fa-check" style={obj.status ? {color:'lightgreen'} : {color:'lightblue'}} 
                          onClick={()=>{taskStatus(obj)}}></i>
                              
                            <b  className="ml-3 text1" style={obj.status ? {color:'lightgreen'} : null} >{obj.status ? <del>{obj.text}</del> : obj.text }</b>
                          </div>
                          {edit === false ?
                          <div className="right">
                              <i className="fas fa-pencil" onClick={()=>editTask(obj)} ></i>&nbsp;
        
                              <i className="fas fa-trash" onClick={(e)=>setToDos(toDos.filter((obj2)=> obj2.id !== obj.id))}></i>
                          </div>
                          :null}
                          </div>
                      </div>
                    
                  )}}
                  else{
                    return(
                          
                      <div className="todos">
                          <div className="todo">
                          <div className="left">
                          <i className="fas fa-check" style={obj.status ? {color:'lightgreen'} : {color:'lightblue'}} 
                          onClick={()=>{taskStatus(obj)}}></i>
                              
                            <b  className="ml-3 text1" style={obj.status ? {color:'lightgreen'} : null} >{obj.status ? <del>{obj.text}</del> : obj.text }</b>
                          </div>
                          {edit === false ?
                          <div className="right">
                              <i className="fas fa-pencil" onClick={()=>editTask(obj)} ></i>&nbsp;
        
                              <i className="fas fa-trash" onClick={(e)=>setToDos(toDos.filter((obj2)=> obj2.id !== obj.id))}></i>
                          </div>
                          :null}
                          </div>
                      </div>
                    
                  )}
                  
                })}
                </div>
              </div>
            {/* </div> */}
          </div>
          <div className="vl"></div>
          <div className="col-md-4">

            <div className='head '>
              .<b>T</b><i>O</i><b>D</b><i>0</i>
            </div>
            <div className="container mt-5">
              <q><q> Every Thing Is Easy <br /><b className="quote"> When You Are Busy, </b><br /> &nbsp;&nbsp; But Nothing Is Easy <br /> <b className="quote">When You Are Lazy.</b></q></q>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
