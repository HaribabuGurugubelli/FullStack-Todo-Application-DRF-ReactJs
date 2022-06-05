import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Axios from "../utils/Axios";

function AllTodos() {
  const [user, setUser] = useState(() =>
    localStorage.getItem("refresh")
      ? jwt_decode(localStorage.getItem("access"))
      : null
  );

  let api = Axios();

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    let response = await api.get("/get_all_tasks/");

    if (response.status === 200) {
      setTodos(response.data);
    }
  };

  const [todoId, setTodoId] = useState("");

  const [todoData, setDodoData] = useState([]);

  const getTodoById = async () => {
    let response = await api.post(`/get_task_by_id/${todoId}/`);

    if (response.status === 200) {
      setDodoData(response.data);
      console.log(response);
    }
  };

  const [data, setData] = useState({
    id: todoId,
    todo: "",
  });

  const todoChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user) {
      getTodos();
      console.log("Todos Fetched");
    }
  }, []);

  return (
    <div>
      <table className="table table-bordered table-striped table-hover">
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
                    getTodoById();
                    handleShow();
                  }}
                >
                  Update
                </button>
                <span className="mx-2"></span>
                <button type="button" className="btn btn-danger btn-sm">
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
          <form>
            <Modal.Header closeButton>
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
              <Button variant="secondary" onClick={handleClose}>
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
