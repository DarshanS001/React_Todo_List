import React, { useState, useEffect } from 'react'
import './App.css';
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([
    // {
    //   "id": 1,
    //   "name": "Learn Python",
    //   "description": "Python language",
    //   "complete": false
    // },
    // {
    //   "id": 2,
    //   "name": "Learn React",
    //   "description": "React Frontend",
    //   "complete": false
    // },
    // {
    //   "id": 3,
    //   "name": "Learn Javascript",
    //   "description": "Javascript Language",
    //   "complete": false
    // }
  ]);

  useEffect(() => {
      axios.get('http://localhost:8000/todos/')
      .then((res)=> {
        setTodos(res.data);
      }).catch(()=>{
        alert("Something went wrong in get API");
      })
  },[])
  console.log("Todo's List", todos);

  return (
    <div>
      {/* <h1>To Do List Application</h1> */}
      <Navbar bg="light" style={{marginBottom: "20px"}}>
        <Container>
          <Navbar.Brand href='#'>
          To-Do Application
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm todos={todos} setTodos={setTodos}/>
        <TodoList todos={todos} setTodos={setTodos}/>
      </Container>
    </div>
  );
}

export default App;
