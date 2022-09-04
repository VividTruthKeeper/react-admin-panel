import React, { useState, useEffect } from "react";

const Login = () => {
  const cred: Record<string, string> = {
    username: "admin@2022",
    password: "backpackadmin",
  };
  const [valid, setValid] = useState({
    username: "",
    password: "",
    check: false,
    valid: false,
  });

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
                  <input type="checkbox" name="remember" id="remember" />
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
                onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                  setValid({ ...valid, check: true });
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
