import React from "react";

function Register(props: any) {
  return (
    <form onSubmit={props.handleSubmit} className="flex flex-col gap-3 my-8">
      <h1 className="text-3xl">Register your account</h1>
      <label htmlFor="username">
        Username <br />
        <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => props.handleUserName(e)} />
      </label>
      <label htmlFor="password">
        Password <br />
        <input id="password" type="text" name="password" placeholder="Enter your password" onChange={(e) => props.handlePassword(e)} />
      </label>
      <button className="bg-violet-500 px-4 py-2 rounded-md mt-2" type="submit">
        Register now
      </button>
    </form>
  );
}

export default Register;
