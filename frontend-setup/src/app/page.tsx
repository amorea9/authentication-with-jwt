"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Register from "@/components/Register";
import LogIn from "@/components/LogIn";
import { useRouter } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  const [registered, setRegistered] = useState(false);
  const [payload, setPayload] = useState({});
  const router = useRouter();

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

        if (data.error) {
          console.log(data.error);
          console.log("can't login");
        } else {
          console.log(data);
          window.localStorage.setItem("token", data.accessToken);
          const token = localStorage.getItem("token");
          console.log(token);
          if (token === null) {
            console.log("token is null, go back to homepage");
            router.push("/");
          } else if (token) {
            router.push("/catfacts");
          }
        }
        fetch("http://localhost:3001/auth/")
          .then((response) => response.json())
          .then((response) => console.log(response))
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("can't login");
      }
    }
  }
  function goToCatFacts() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : console.log("no token");
    if (token) {
      router.push("/catfacts");
    } else {
      console.log("you need to login first");
      router.push("/");
    }
  }

  return (
    <main className="main">
      <p>{result}</p>
      <h1>Want to see cat facts? Register or log in</h1>
      <button onClick={() => setRegistered(false)}>Register</button>
      <button onClick={() => setRegistered(true)}>I already have an account</button>
      {!registered && <Register handleSubmit={handleSubmit} handleUserName={handleUserName} handlePassword={handlePassword} />}
      {registered && <LogIn handleSubmit={handleSubmit} handleUserName={handleUserName} handlePassword={handlePassword} />}
      <button onClick={goToCatFacts}>Go to cat facts</button>
    </main>
  );
}
