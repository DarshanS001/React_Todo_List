import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import axios from 'axios';

const TodoForm = ({todos, setTodos}) => {
    const [todoName, setTodoName] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [todoId, setTodoId]=useState();

    const idArray = []

    for(let i=0; i<todos.length; i++){
        console.log("todos.id",todos[i].id)
        idArray.push(todos[i].id)
        
    }
    console.log('idArray', idArray);
 
    const handleTodoId = () =>{
        const number = idArray[idArray.length-1]+1;
        setTodoId(number)
        console.log('todoId', todoId);
    }

    const handleNameChange = e => {
        setTodoName(e.target.value);
    }

    console.log('idArray', idArray);

    const handleDesriptionChange = e => {
        setTodoDescription(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!todoName && !todoDescription) {
            alert("Please provide a valid value for todo");
            return;
        }

        axios.post("http://localhost:8000/todos/", {
            id:todoId,
            title: todoName,
            description: todoDescription,
            done: false
        }).then((res) => {
            setTodoName("");
            setTodoDescription("");
            const { data } = res;
            setTodos([
                ...todos,
                data
            ]) 
        }).catch(() => {
            alert("Something went wrong in Post API");
        })
    }

  return (
    <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-4">
            <FormControl
             placeholder="New Todo"
             onChange={handleNameChange}
             value={todoName}
             />
            <FormControl
             placeholder="Description"
             onChange={handleDesriptionChange}
             value={todoDescription}
             />
            <Button type="submit" onClick={handleTodoId}>
                Add
            </Button>
        </InputGroup>
    </Form>
  )
}

export default TodoForm