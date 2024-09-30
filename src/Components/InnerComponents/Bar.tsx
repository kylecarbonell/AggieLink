import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Bar() {
  const [name, setName] = useState("")

  useEffect(() => {
    let data = JSON.parse(window.localStorage.getItem("Data") || "{}");
    // console.log("CHANGED BAR")



    setName(data?.first + " " + data?.last || "")

    // console.log(name.indexOf("undefined"))
  }, [window.localStorage.getItem("Data")])



  return (
    <>
      <div
        className="Main-Page-Bar"
      >
        <img src="./aggie.jpg"></img>
        <h1
          style={{
            justifyContent: "left",
            marginLeft: "50px",
            userSelect: "none",
            fontFamily: "aileron"
          }}
        >
          AggieLink
        </h1>
        <NavLink to="/">
          <h1
            id="Bar-Title"
            onClick={() => {
              console.log("HELLO");
            }}
          >
            Home
          </h1>
        </NavLink>

        <NavLink to="/groups">
          <h1
            id="Bar-Title"
            onClick={() => {
              console.log("HELLO");
            }}
          >
            Groups
          </h1>
        </NavLink>

        <NavLink to="/account">
          <h1
            id="Bar-Title"
            onClick={() => {
              console.log("HELLO");
            }}
          >
            {
              name.indexOf("undefined") < 0 ? name : "Login"
            }
          </h1>
        </NavLink>
      </div>
    </>
  );
}

export default Bar;
