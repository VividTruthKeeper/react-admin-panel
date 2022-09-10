// Modules
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Credits
import { cred } from "../user";

const Login = () => {
  const [valid, setValid] = useState({
    username: "",
    password: "",
    remember: false,
    check: false,
    valid: false,
  });

  const { user, setUser } = useContext<any>(UserContext);

  useEffect(() => {
    if (valid.username === cred.username && valid.password === cred.password) {
      setValid({ ...valid, valid: true });
    } else {
      setValid({ ...valid, valid: false });
    }
  }, [valid.username, valid.password]);

  return (
    <main className="login">
      <div className="container">
        <div className="login inner">
          <div className="login__wrapper">
            <h1 className="login__header">Login</h1>
            <form
              className="login__form"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
              }}
            >
              <div className="login__form__block">
                <label htmlFor="username">Username</label>
                <input
                  required
                  autoComplete="true"
                  type="text"
                  id="username"
                  placeholder="username"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValid({ ...valid, username: e.target.value });
                  }}
                />
              </div>
              <div className="login__form__block">
                <label htmlFor="password">Password</label>
                <input
                  required
                  autoComplete="true"
                  type="password"
                  id="password"
                  placeholder="password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValid({ ...valid, password: e.target.value });
                  }}
                />
              </div>
              <div className="login__form__block--check">
                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValid({ ...valid, remember: e.target.checked });
                    }}
                  />
                  <span>Remember me</span>
                </label>
              </div>
              <span
                className={
                  valid.check && !valid.valid
                    ? "login__form__error active"
                    : "login__form__error"
                }
              >
                Invalid credentials
              </span>
              <button
                className="login__form__button login__form__button--violet"
                onClick={() => {
                  setValid({ ...valid, check: true });
                  if (valid.valid) {
                    setUser({
                      username: valid.username,
                      accessLevel: "admin",
                    });
                  }
                  if (valid.remember) {
                    const value = {
                      username: valid.username,
                      accessLevel: "admin",
                    };
                    localStorage.setItem("userData", JSON.stringify(value));
                  }
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
