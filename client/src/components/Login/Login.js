import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, password };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch("http://localhost:3001/login", options);
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
        <h1>Login Form</h1>
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
        <button type="submit" onClick={onSubmit}>
          Log In
        </button>
        <p>Don't have account ?</p>
        <Link to="/signup">Sign Up Here</Link>
      </form>
    </div>
  );
};

export default Login;
