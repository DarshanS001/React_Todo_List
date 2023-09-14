import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import { Button, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import axios from "axios";

const TodoList = ({ todos, setTodos }) => {
  const [show, setShow] = useState(false);
  const [record, setRecord] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleRecordName = (e) => {
    setRecord({ ...record, title: e.target.value });
  };

  console.log("recordArray", record);

  const handleRecordDescription = (e) => {
    setRecord({ ...record, description: e.target.value });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/todos/${id}`)
      .then(() => {
        const newTodos = todos.filter((t) => {
          return t.id !== id;
        });
        setTodos(newTodos);
      })
      .catch(() => {
        alert("something went wromg in Delete API");
      });
  };

  const handleUpdate = async (id, value) => {
    return axios
      .put(`http://localhost:8000/todos/${id}`, value)
      .then((res) => {
        const { data } = res;
        const newTodos = todos.map((t) => {
          if (t.id === id) {
            console.log("data in axios put:", data);
            return data;
          }
          return t;
        });
        setTodos(newTodos);
      })
      .catch(() => {
        alert("Something went wrong in Patch API");
      });
  };

//   const renderListGroupItem = (t) => {
//     return (
//       <ListGroup.Item
//         key={t.id}>
//         <div className='d-flex justify-content-center'>
//                 <span style={{marginRight:"12px", cursor:"pointer"}} onClick={()=>{
//                     setRecord(t);
//                     handleUpdate(t.id, {
//                         id: t.id,
//                         title:t.title,
//                         description:t.description,
//                         done: !t.done
//                     })
//         }}>
//                     {t.done === true ? <MdCheckBox/>: <MdCheckBoxOutlineBlank/>}
//                 </span>
                
//                 <span>
//                     {t.done === true ? <strike>{t.title}</strike>: t.title}
//                 </span>

//                 <span>
//                 {t.done === true ? <strike>{t.description}</strike>: t.description}
//                 </span>
//             </div>
//             <div>
//             {t.done === false && <MdEdit style={{cursor:"pointer", marginRight:"12px"}}
//                 onClick={()=>{
//                     setRecord(t);
//                     setShow(true);
//                 }}/>}
                
//             {t.done === false && <MdDelete style={{cursor:"pointer"}}
//                 onClick={()=>{handleDelete(t.id)}}/>}
                
//             </div>

//         <Table key={t.id} striped bordered hover variant="dark">
//           <tbody>
//             <tr>
//               <td>
//                 <span
//                   style={{ marginRight: "12px", cursor: "pointer" }}
//                   onClick={() => {
//                     setRecord(t);
//                     handleUpdate(t.id, {
//                       id: t.id,
//                       title: t.title,
//                       description: t.description,
//                       done: !t.done,
//                     });
//                   }}
//                 >
//                   {t.done === true ? (
//                     <MdCheckBox />
//                   ) : (
//                     <MdCheckBoxOutlineBlank />
//                   )}
//                 </span>
//               </td>

//               <td>
//                 <span>
//                   {t.done === true ? <strike>{t.title}</strike> : t.title}
//                 </span>
//               </td>

//               <td>
//                 <span>
//                   {t.done === true ? (
//                     <strike>{t.description}</strike>
//                   ) : (
//                     t.description
//                   )}
//                 </span>
//               </td>

//               <td>
//                 <div>
//                   {t.done === false && (
//                     <MdEdit
//                       style={{ cursor: "pointer", marginRight: "12px" }}
//                       onClick={() => {
//                         setRecord(t);
//                         setShow(true);
//                       }}
//                     />
//                   )}

//                   {t.done === false && (
//                     <MdDelete
//                       style={{ cursor: "pointer" }}
//                       onClick={() => {
//                         handleDelete(t.id);
//                       }}
//                     />
//                   )}
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </ListGroup.Item>
//     );
//   };

  const handleSaveChanges = async () => {
    await handleUpdate(record.id, {
      id: record.id,
      title: record.title,
      description: record.description,
    });
    handleClose();
  };

  // const completedTodos = todos.filter(t=>t.done === true);
  // const incompleteTodos = todos.filter(t=>t.done === false);
  return (
    <div>
      {/* <ListGroup>{todos.map(renderListGroupItem)}</ListGroup> */}

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Complete</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {todos && todos.map((ele, id)=>{
                return (
                    <tr key={id}>
                     <td>{id+1}</td>   
              <td>
                <span
                  style={{ marginRight: "12px", cursor: "pointer" }}
                  onClick={() => {
                    setRecord(ele);
                    handleUpdate(ele.id, {
                      id: ele.id,
                      title: ele.title,
                      description: ele.description,
                      done: !ele.done,
                    });
                  }}
                >
                  {ele.done === true ? (
                    <MdCheckBox />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                </span>
              </td>

              <td>
                <span>
                  {ele.done === true ? <strike>{ele.title}</strike> : ele.title}
                </span>
              </td>

              <td>
                <span>
                  {ele.done === true ? (
                    <strike>{ele.description}</strike>
                  ) : (
                    ele.description
                  )}
                </span>
              </td>

              <td>
                <div>
                  {ele.done === false && (
                    <MdEdit
                      style={{ cursor: "pointer", marginRight: "12px", color:"yellow"}}
                      onClick={() => {
                        setRecord(ele);
                        setShow(true);
                      }}
                    />
                  )}

                  {ele.done === false && (
                    <MdDelete
                      style={{ cursor: "pointer", color:"red" }}
                      onClick={() => {
                        handleDelete(ele.id);
                      }}
                    />
                  )}
                </div>
              </td>
            </tr>
                )
            })}
        </tbody>
</Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>To Do Name</h5>
          <FormControl
            value={record ? record.title : ""}
            onChange={handleRecordName}
          />
          <br />
          <h5>To Do Description</h5>
          <FormControl
            value={record ? record.description : ""}
            onChange={handleRecordDescription}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoList;
