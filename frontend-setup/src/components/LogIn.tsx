import React from "react";

function LogIn(props: any) {
  return (
    <form className="flex flex-col gap-3 my-8" onSubmit={props.handleSubmit}>
      <h1 className="text-3xl">Sign in</h1>
      <label htmlFor="username">
        Username <br />
        <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => props.handleUserName(e)} />
      </label>
      <label htmlFor="password">
        Password <br />
        <input id="password" type="text" name="password" placeholder="Enter your password" onChange={(e) => props.handlePassword(e)} />
      </label>

      <button className="bg-violet-500 px-4 py-2 rounded-md mt-2" type="submit">
        Sign in
      </button>
    </form>
  );
}

export default LogIn;
