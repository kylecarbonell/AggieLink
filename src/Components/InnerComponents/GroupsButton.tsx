import "../Groups.css";

import { FiBookOpen } from "react-icons/fi";
import { TfiBasketball } from "react-icons/tfi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FiCoffee } from "react-icons/fi";


import GroupsPopup from "./GroupsPopup";
import { useEffect, useState } from "react";
import React from "react";

interface props {
  max_users: String;
  topic: String;
  title: String;
  city: String;
  loc: String;
  users: Array<String>;
  end_time: String;
  _id: String;
}

function GroupsButton(props: props) {

  const [showPopup, setPop] = useState(false)
  const [userInfo, setUserInfo] = useState<any>([])

  function getTopic(topic: String) {
    if (topic == "Study Groups") {
      return <FiBookOpen></FiBookOpen>;
    } else if (topic == "Sports") {
      return <TfiBasketball></TfiBasketball>;
    } else if (topic == "Coffee") {
      return <FiCoffee />
    } else if (topic == "Food") {
      return <IoFastFoodOutline />
    }
  }

  const getUser = async () => {
    const result = await fetch(`http://localhost:8000/getUser?doc=${props.users}`).then(async (res) => {


      const json = await res.json()
      // console.log("USERS")
      // console.log(json)

      setUserInfo(json)
    });

  }

  useEffect(() => {
    getUser()
  }, [])

  function onClick() {
    getUser()
    setPop(true)
  }

  return (
    <>
      <div className="Groups-Button" onClick={() => onClick()}>
        <div className="Groups-Button-Icon" style={{ color: "var(--blue)" }}>{getTopic(props.topic)}</div>
        <div className="Groups-Button-Description">
          <h1
            style={{
              fontSize: "1.25rem",
              marginBottom: "0",
              fontWeight: "bolder",
            }}
          >
            {props.title}
          </h1>
          <h1
            style={{
              fontSize: "1rem",
              marginBottom: "0",
              marginTop: "2%",
              fontWeight: "normal",
            }}
          >
            {props.city}
          </h1>
          <h1
            style={{
              fontSize: "1.6vh",
              marginBottom: "0",
              marginTop: "2%",
              fontWeight: "normal",
            }}
          >
            {props.loc}
          </h1>
          <h1
            style={{
              fontSize: "1rem",
              marginBottom: "0",
              marginTop: "5%",
              fontWeight: "normal",
            }}
          >
            {props.users.length} / {props.max_users}
          </h1>
        </div>
      </div>

      <GroupsPopup show={showPopup} setShow={setPop} topic={props.topic} title={props.title} loc={props.loc} city={props.city} users={userInfo} max_users={props.max_users} end_time={props.end_time} _id={props._id} emails={props.users}></GroupsPopup>
    </>
  );
}

export default GroupsButton;
