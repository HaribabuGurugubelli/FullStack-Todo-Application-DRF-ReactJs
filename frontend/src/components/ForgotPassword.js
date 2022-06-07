import "../style.css";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
const axios = require("axios");

function ForgotPassword() {
  const [data, setData] = useState({
    phone_number: "",
    email: "",
    password: "",
  });

  const ChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHanler = (e) => {
    e.preventDefault();
    resetRequest();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetRequest = () => {
    axios
      .post(`http://127.0.0.1:8000/forgot_password/`, { ...data })
      .then((response) => {
        if (response.status === 200) {
          handleShow();
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const confirmResetRequest = () => {
    axios
      .put(`http://127.0.0.1:8000/forgot_password/`, { ...data })
      .then((response) => {
        if (response.status === 201) {
          window.location.href = "/";
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const confirmSubmitHanler = (e) => {
    e.preventDefault();
    confirmResetRequest();
  };

  return (
    <div className="container login-wrapper">
      <div className="">
        <div className="heading m-2">
          <h3>Reset Password</h3>
          <hr></hr>
        </div>
        <form onSubmit={submitHanler}>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              placeholder="Your Mobile Number"
              name="phone_number"
              onChange={ChangeHandler}
              required
            />
          </div>
          <button type="submit" className="btn btn-lg btn-success mb-3">
            Submit
          </button>
        </form>
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={confirmSubmitHanler}>
            <Modal.Header
              closeButton
              onClick={() => {
                handleClose();
              }}
            >
              <Modal.Title>Confirm Your Identity</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Account Linked Email Id
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={ChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="************"
                  name="password"
                  onChange={ChangeHandler}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default ForgotPassword;
