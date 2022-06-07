import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import UseAxios from "../../utils/UseAxios";

function Profile() {
  let { id } = useParams();
  let api = UseAxios();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState([]);

  const getUser = async () => {
    let response = await api.get(`/get_user_by_id/${id}/`);

    if (response.status === 200) {
      setUserData(response.data);
    }
  };

  const [data, setData] = useState({});

  const changeHandler = (e) => {
    setUserData("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    let response = await api.put(`/get_user_by_id/${id}/`, { ...data });

    console.log(response);
    if (response.status === 201) {
      window.location.href = "/dashboard";
    }
  };

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    updateUser();
  };

  const [pass, setPass] = useState({});

  const passChangeHandler = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const ChangePassword = async () => {
    try {
      let response = await api.put(`/change_password/`, { ...pass });

      if (response.status === 200) {
        window.alert("Password Changed Successfully.");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      window.alert("Invalid Current Password.");
    }
  };

  const passSubmitHandler = (e) => {
    e.preventDefault();
    ChangePassword();
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className="container">
      <button className="btn btn-sm btn-warning float-end" onClick={handleShow}>
        Change Password
      </button>
      <br></br>
      <br></br>
      <form onSubmit={updateSubmitHandler}>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={userData.email}
              name="email"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={userData.full_name}
              name="full_name"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="phone_number" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone_number"
              value={userData.phone_number}
              name="phone_number"
              onChange={changeHandler}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              value={userData.gender}
              name="gender"
              onChange={changeHandler}
            />
          </div>
        </div>
        <button className="btn btn-warning m-4">Update</button>
      </form>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={passSubmitHandler}>
            <Modal.Header
              closeButton
              onClick={() => {
                handleClose();
              }}
            >
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="currentPassword"
                  name="old_password"
                  onChange={passChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newPassword"
                  name="new_password"
                  onChange={passChangeHandler}
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
              <Button type="submit" variant="warning">
                Change
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Profile;
