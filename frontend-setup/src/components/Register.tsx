import React from "react";

function Register(props: any) {
  return (
    <form onSubmit={props.handleSubmit}>
      <h1>Register</h1>
      <label htmlFor="username">
        Username
        <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => props.handleUserName(e)} />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" type="text" name="password" placeholder="Enter your password" onChange={(e) => props.handlePassword(e)} />
      </label>
      <button type="submit">Register now</button>
    </form>
  );
}

export default Register;
