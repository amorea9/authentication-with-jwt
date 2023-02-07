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
    permission: true,
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
        if (data.message === "Unauthorized") {
          console.log(data.statusCode);
          console.log("Unauthorized");
          setUserStatus({ ...userStatus, permission: false });
        } else {
          setUserStatus({ ...userStatus, permission: true });
        }
      });
  }
  function logOut() {
    localStorage.removeItem("token");
    setUserStatus({ ...userStatus, registered: false, loggedIn: false });
    console.log("you are logged out");
  }

  return (
    <main className="main">
      <h1 className="mb-8">
        Response from the server: <span className="text-purple-500">"{result}"</span>
      </h1>
      <h1 className="text-4xl">Want to see cat facts? </h1>

      <div className="flex flex-row gap-4 justify-center items-center my-8">
        <button className="bg-violet-500 px-4 py-2 rounded-md" onClick={() => setUserStatus({ ...userStatus, registered: false })}>
          Register
        </button>
        <p>or</p>
        <button className="bg-violet-500 px-4 py-2 rounded-md" onClick={() => setUserStatus({ ...userStatus, registered: true })}>
          I already have an account
        </button>
      </div>

      {userStatus.registered === false && <Register handleSubmit={handleSubmit} handleUserName={handleUserName} handlePassword={handlePassword} />}
      {userStatus.registered === true && <LogIn handleSubmit={handleSubmit} handleUserName={handleUserName} handlePassword={handlePassword} />}

      <h1 className="text-4xl text-white my-8">Cat facts</h1>
      {catFacts.statusCode !== 401
        ? catFacts.map((fact: factObj) => (
            <p className="my-2" key={fact._id}>
              {fact.text}
            </p>
          ))
        : null}
      <div className=" flex flex-col gap-4 mt-8 min-w-fit">
        {userStatus.permission === false && <p className="text-red-600 italic">Register or sign in to see cat facts</p>}
        <button className="bg-violet-500 px-4 py-2 rounded-md" onClick={getCatFacts}>
          Get daily cat facts
        </button>

        <button className="bg-red-700 px-4 py-2 rounded-md" onClick={logOut}>
          Log out
        </button>
      </div>
    </main>
  );
}
