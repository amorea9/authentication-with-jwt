import React from "react";

function LogIn(props: any) {
  return (
    <form onSubmit={props.handleSubmit}>
      <h1>Sign in</h1>
      <label htmlFor="username">
        Username
        <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => props.handleUserName(e)} />
      </label>
      <label htmlFor="password">
        Password
        <input id="password" type="text" name="password" placeholder="Enter your password" onChange={(e) => props.handlePassword(e)} />
      </label>

      <button type="submit">Submit & go to cats </button>
    </form>
  );
}

export default LogIn;
