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

  let pro_image = "http://127.0.0.1:8000" + userData.image;

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

  const [image, setImage] = useState(null);

  let formField = new FormData();

  if (image !== null) {
    formField.append("image", image);
  }

  const UploadProfileImage = async () => {
    try {
      let response = await api.post(`/upload_profile_image/`, formField);

      console.log(response);

      if (response.status === 201) {
        // window.alert("Profile Image Uploaded Successfully.");
        // window.location.href = "/dashboard";
        getUser();
      }
    } catch (error) {
      console.log(error);
      window.alert("Photo not Uploaded");
    }
  };

  const ProfilePicSubmitHandler = (e) => {
    e.preventDefault();
    if (image !== null) {
      UploadProfileImage();
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="col-md-6 offset-md-3">
          <div>
            {userData.image ? (
              <img
                className="rounded rounded-circle mx-auto d-block"
                src={pro_image}
                width="150"
                height="150"
              />
            ) : (
              <i className="fa-solid fa-user fa-5x"></i>
            )}
          </div>
          <br></br>
          <form
            onSubmit={ProfilePicSubmitHandler}
            enctype="multipart/form-data"
          >
            <div className="row">
              <div className="col-md-6 d-flex offset-md-3">
                <label
                  htmlFor="files"
                  className="btn btn-outline-secondary mt-1"
                >
                  Change
                </label>
                <input
                  accept="image/*"
                  id="files"
                  style={{ visibility: "hidden" }}
                  type="file"
                  // name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  // onChange={(e) => setProImg(e.target.files[0])}
                  // onChange={proPicChangeHandler}
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-outline-primary mt-1"
                  style={{ height: "90%" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        <button
          className="btn btn-sm btn-warning float-end"
          onClick={handleShow}
        >
          Change Password
        </button>
        <br></br>
        <br></br>
        <form onSubmit={updateSubmitHandler}>
          <div className="row">
            <div className="mb-3 col-md-6">
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
            <div className="mb-3 col-md-6">
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
            <div className="mb-3 col-md-6">
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
            <div className="mb-3 col-md-6">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                name="gender"
                aria-label="Default select example"
                onChange={changeHandler}
              >
                <option value="">{userData.gender}</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
    </div>
  );
}

export default Profile;
