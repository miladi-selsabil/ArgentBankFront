import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchOrUpdateLogin } from "../store/login";

import {
  selectLoginError,
  selectIsConnected,
  selectBackendUrl,
} from "../store/selector";


import { useDispatch, useSelector } from "react-redux";


function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localUserEmail = localStorage.getItem("userEmail");

  const backendUrl = useSelector(selectBackendUrl());
  const loginError = useSelector(selectLoginError());
  const isConnected = useSelector(selectIsConnected());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    rememberMe
      ? localStorage.setItem("userEmail", email)
      : localStorage.removeItem("userEmail");
    dispatch(fetchOrUpdateLogin(backendUrl, email, password));
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  /* vérifie si l'utilisateur est connecté Si l'utilisateur est connecté, il redirige vers la page profil*/
  useEffect(() => {
    if (isConnected && loginError === null) {
      navigate("/profile");
    }

    if (localUserEmail) {
      setRememberMe(true);
      setEmail(localUserEmail);
    }
  }, [isConnected, loginError, dispatch, navigate, localUserEmail, setEmail]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {loginError && (
            <div className="input-remember input-error">
              {loginError.response.data.message}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
