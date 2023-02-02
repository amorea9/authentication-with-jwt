"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Register from "@/components/Register";
import LogIn from "@/components/LogIn";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  const [userStatus, setUserStatus] = useState({
    registered: false,
    loggedIn: false,
  });
  const [payload, setPayload] = useState({});
  const [catFacts, setCatFacts] = useState([]) as any;
  type factObj = { _id: string; text: string };

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((data) => {
        setResult(data);
      });
  }, []);

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
    if (!userStatus.registered) {
      try {
        const response = await fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        setUserStatus({ ...userStatus, registered: true });
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
        setUserStatus({ ...userStatus, registered: true, loggedIn: true });
        if (data.error) {
          console.log(data.error);
          console.log("can't login");
        } else {
          console.log(data);
          window.localStorage.setItem("token", data.accessToken);
          const token = localStorage.getItem("token");
          console.log(token);
        }
      } catch (error) {
        console.error("can't login");
      }
    }
  }

  async function getCatFacts() {
    await fetch("http://localhost:3001/catsfacts/catfact", {
      method: "GET",
      //mode: "no-cors",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCatFacts(data);
      });
  }

  return (
    <main className="main">
      <p>{result}</p>
      <h1>Want to see cat facts? Register or log in</h1>

      {userStatus.registered === false && <Register handleSubmit={handleSubmit} handleUserName={handleUserName} handlePassword={handlePassword} />}
      {userStatus.registered === true && <LogIn handleSubmit={handleSubmit} handleUserName={handleUserName} handlePassword={handlePassword} />}
      <button onClick={() => setUserStatus({ ...userStatus, registered: false })}>Register</button>
      <button onClick={() => setUserStatus({ ...userStatus, registered: true })}>I already have an account</button>
      <h1 className="text-4xl text-white">Cat facts</h1>
      <div>{catFacts.statusCode !== 401 ? catFacts.map((fact: factObj) => <p key={fact._id}>{fact.text}</p>) : null}</div>

      <button onClick={getCatFacts}>Get daily cat facts</button>
    </main>
  );
}
