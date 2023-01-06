import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onSignup = async (event) => {
    event.preventDefault();
    const userData = { name, username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch("http://localhost:3001/signup", options);
    if (response.ok === true) {
      navigate("/");
    } else {
      const errorMsg = await response.text();
      alert(errorMsg);
    }
  };

  return (
    <div>
      <form>
        <h1>Sign Up Form</h1>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          value={name}
          onChange={onChangeName}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={onChangeUsername}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChangePassword}
        />
        <button type="submit" onClick={onSignup}>
          Register
        </button>
        <p>Already Have an Account ?</p>
        <Link to="/login">Login Here</Link>
      </form>
    </div>
  );
};

export default Signup;
