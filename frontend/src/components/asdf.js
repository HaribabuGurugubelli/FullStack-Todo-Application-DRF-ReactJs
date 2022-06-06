<div className="container login-wrapper">
  <div className="heading m-2">
    <h3>Signup</h3>
    <hr></hr>
  </div>
  <form id="signupForm" onSubmit={SubmitHandler}>
    <div className="mb-3">
      <label htmlFor="full_name" className="form-label">
        Full Name
      </label>
      <input
        type="text"
        className="form-control"
        id="full_name"
        name="full_name"
        placeholder="Your Name"
        onChange={ChangeHandler}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="Phone_number" className="form-label">
        Mobile Number
      </label>
      <input
        type="text"
        className="form-control"
        id="Phone_number"
        name="phone_number"
        placeholder="Your Mobile Number"
        onChange={ChangeHandler}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email address
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        name="email"
        placeholder="name@example.com"
        onChange={ChangeHandler}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="pwd" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        id="pwd"
        name="password"
        onChange={ChangeHandler}
      />
    </div>
    <button
      type="submit"
      className="btn btn-lg btn-success mb-3"
      style={{ marginLeft: "39%" }}
    >
      Signup
    </button>
  </form>
</div>;
