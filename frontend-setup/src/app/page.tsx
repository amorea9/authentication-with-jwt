"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  const [catFacts, setCatFacts] = useState([]);
  const [registered, setRegistered] = useState(false);
  const [payload, setPayload] = useState({});

  type factObj = { _id: string; text: string };
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((data) => {
        setResult(data);
      });
  }, []);

  const getCatFacts = () => {
    fetch("http://localhost:3001/catsfacts/catfact")
      .then((res) => res.json())
      .then((data) => {
        setCatFacts(data);
      });
  };

  function handleUserName(e: React.ChangeEvent<HTMLInputElement>) {
    let username = e.target.value;
    setPayload({ ...payload, username: username });
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    let password = e.target.value;
    setPayload({ ...payload, password: password });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!registered) {
      try {
        const response = await fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);

        fetch("http://localhost:3001/auth/")
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/auth/signin", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);

        fetch("http://localhost:3001/auth/")
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <main className="main">
      <p>{result}</p>
      {catFacts ? catFacts.map((fact: factObj) => <p key={fact._id}>{fact.text}</p>) : null}
      <button onClick={() => setRegistered(false)}>SignUp</button>
      <button onClick={() => setRegistered(true)}>SignIn</button>
      {!registered && (
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="username">
            Username
            <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => handleUserName(e)} />
          </label>
          <label htmlFor="password">
            Password
            <input id="password" type="text" name="password" placeholder="Enter your password" onChange={(e) => handlePassword(e)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
      {registered && (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label htmlFor="username">
            Username
            <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => handleUserName(e)} />
          </label>
          <label htmlFor="password">
            Password
            <input id="password" type="text" name="password" placeholder="Enter your password" onChange={(e) => handlePassword(e)} />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      <button className="p-4 border-2 bg-transparent border-white rounded-md hover:bg-pink-800 transition-all" onClick={() => getCatFacts()}>
        Load cats facts for the day
      </button>
    </main>
  );
}
