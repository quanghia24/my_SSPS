import React, { useEffect, useState } from "react";
import UserAPIs from "../APIservers/UserAPIs";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);
  const [isLogin, setIsLogin] = useState(true);
 

  const navigate = useNavigate();
  useEffect(() => {
    if (token["mytoken"]) {
      navigate("/");
    }
  }, [navigate, token]);
  const loginBtn = () => {
    UserAPIs.LoginUser({ username, password })
      .then((res) => {
        console.log(res.token);
        setToken("mytoken", res.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const registerBtn = () => {
    UserAPIs.RegisterUser({ username, password })
      .then(() => loginBtn())
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <br />
      <br />
      {isLogin ? <h1>LOGIN</h1>: <h1>Register</h1>}
      <br />
      <br />

      <div className="container mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="text"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {isLogin ? <button onClick={loginBtn} className="btn btn-primary">Login</button>
        : <button onClick={registerBtn} className="btn btn-primary">Register</button>

        }
        <div className="mb-3">
          {isLogin ? <h5>If u don't have an account, pls <button className="btn btn-primary" onClick={() => setIsLogin(false)}>Register</button> here</h5>
          : <h5>If u have an account, pls <button className="btn btn-primary" onClick={() => setIsLogin(true)}>Login</button> here</h5>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;
