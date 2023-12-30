import React from "react";
import { loginAction } from "../action";

function Login() {
  return (
    <div className="p-4">
      <h2>Login</h2>
      <form action={loginAction}>
        <div className="mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-transparent border border-white"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-transparent border border-white"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
