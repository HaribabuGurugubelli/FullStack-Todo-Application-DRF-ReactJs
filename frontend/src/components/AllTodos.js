import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import UseAxios from "../utils/UseAxios";

function AllTodos() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("refresh")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  let api = UseAxios();

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    let response = await api.get(`/get_all_tasks/`);

    if (response.status === 200) {
      setTodos(response.data);
      setTodoId("");
    }
  };

  const [todoId, setTodoId] = useState("");

  const [todoData, setDodoData] = useState([]);

  const getTodoById = async () => {
    let response = await api.post(`/get_task_by_id/${todoId}/`);

    if (response.status === 200) {
      setDodoData(response.data);
      handleShow();
      console.log(response);
    }
  };

  const [data, setData] = useState({
    todo: "",
  });

  const todoChangeHandler = (e) => {
    setDodoData("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateTodo = async () => {
    let response = await api.put(`/get_task_by_id/${todoId}/`, { ...data });

    if (response.status === 201) {
      console.log(response);
      getTodos();
    }
  };

  const UpdateSubmitHandle = (e) => {
    e.preventDefault();
    updateTodo();
    handleClose();
  };

  const [newTodo, setNewTodo] = useState({
    todo: "",
  });

  const ChangeHandler = (e) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const addTodos = async () => {
    let response = await api.post(`/get_all_tasks/`, { ...newTodo });

    if (response.status === 201) {
      getTodos();
    }
  };

  const SubmitHandle = (e) => {
    e.preventDefault();
    addTodos();
    document.getElementById("todo_form").reset();
  };

  const [delTodoId, setDelTodoId] = useState("");

  const deleteTodo = async () => {
    let response = await api.delete(`/get_task_by_id/${delTodoId}/`);

    if (response.status === 200) {
      getTodos();
      setDelTodoId("");
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, []);

  useEffect(() => {
    if (todoId) {
      getTodoById();
    }
  }, [todoId]);

  useEffect(() => {
    if (delTodoId) {
      deleteTodo();
    }
  }, [delTodoId]);

  return (
    <div>
      <form onSubmit={SubmitHandle} id="todo_form">
        <div className="mb-3 d-flex w-50 container">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Enter New Todo"
            name="todo"
            onChange={ChangeHandler}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
      <table className="table table-bordered table-striped table-hover w-50 container">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Todo</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.todo}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => {
                    setTodoId(todo.id);
                  }}
                >
                  Update
                </button>
                <span className="mx-2"></span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    setDelTodoId(todo.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={UpdateSubmitHandle}>
            <Modal.Header
              closeButton
              onClick={() => {
                handleClose();
                setTodoId("");
              }}
            >
              <Modal.Title>Update Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Todo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={todoData.todo}
                  name="todo"
                  onChange={todoChangeHandler}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  setTodoId("");
                }}
              >
                Close
              </Button>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default AllTodos;
