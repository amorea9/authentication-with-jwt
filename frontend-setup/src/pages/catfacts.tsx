import React from "react";
import { useState } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";

function catfacts() {
  const [catFacts, setCatFacts] = useState([]);
  const [acces, setAccess] = useState(false);
  type factObj = { _id: string; text: string };
  const router = useRouter();

  //go to endpoint auth
  //get request
  //user where user token exists
  //set access to true
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : console.log("no token");
  console.log(token);
  const getCatFacts = async () => {
    if (token === null) {
      router.push("/");
      console.log("back to homepage");
    } else {
      await fetch("http://localhost:3001/catsfacts/catfact", {
        method: "GET",
        //mode: "no-cors",
        headers: {
          Authorization: "Bearer" + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCatFacts(data);
        });
    }
  };

  // if (token) {
  //   setAccess(true);
  //   getCatFacts();
  // }
  // if (!token) {
  //   setAccess(false);
  // }

  return (
    <main className="main">
      {/* {acces ? <h1 className="text-4xl text-white">You are logged in</h1> : null} */}
      <h1 className="text-4xl text-white">Cat facts</h1>
      {catFacts ? catFacts.map((fact: factObj) => <p key={fact._id}>{fact.text}</p>) : null}
      <button className="p-4 border-2 bg-transparent border-white rounded-md hover:bg-pink-800 transition-all" onClick={() => getCatFacts()}>
        Load cats facts for the day
      </button>
    </main>
  );
}

export default catfacts;
