import "../Groups.css";

import GroupsPopup from "./GroupsPopup";
import { useEffect, useState } from "react";
import React from "react";
import getIcon, { call } from "../../Data/GroupData";

interface props {
  date: String;
  max_users: String;
  topic: String;
  title: String;
  city: String;
  loc: String;
  users: Array<String>;
  end_time: String;
  start_time: any
  event: String,
  _id: String;
}

function GroupsButton(props: props) {

  const [showPopup, setPop] = useState(false)
  const [userInfo, setUserInfo] = useState<any>([])


  /**
   * Gets all users in the "users" array of the current group
   * and updates the state to be displayed on the frontend
   */
  const getUser = async () => {
    const result = await fetch(`${call}/getUser?doc=${props.users}`).then(async (res) => {
      const json = await res.json()
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
        <div className="Groups-Button-Icon" style={{ color: "var(--blue)", fontSize: "4rem" }}>{getIcon(props.event)}</div>
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

      <GroupsPopup show={showPopup} setShow={setPop} topic={props.topic} title={props.title} loc={props.loc} city={props.city} users={userInfo} max_users={props.max_users} end_time={props.end_time} _id={props._id} emails={props.users} start_time={props.start_time} date={props.date}></GroupsPopup>
    </>
  );
}

export default GroupsButton;
