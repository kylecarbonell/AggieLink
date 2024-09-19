import "../Groups.css";
import { FiBookOpen } from "react-icons/fi";
import { TfiBasketball } from "react-icons/tfi";
import GroupsPopup from "./GroupsPopup";
import { useState } from "react";

interface props {
  topic: String;
  title: String;
  city: String;
  loc: String;
}

function GroupsButton(props: props) {

  const [showPopup, setPop] = useState(false)

  function getTopic(topic: String) {
    if (topic == "Study") {
      return <FiBookOpen></FiBookOpen>;
    } else if (topic == "Sport") {
      return <TfiBasketball></TfiBasketball>;
    }
  }

  function onClick() {
    setPop(true)
  }

  return (
    <>
      <div className="Groups-Button" onClick={() => onClick()}>
        <div className="Groups-Button-Icon" style={{ color: "var(--blue)" }}>{getTopic(props.topic)}</div>
        <div className="Groups-Button-Description">
          <h1
            style={{
              fontSize: "1.5rem",
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
              fontSize: "1rem",
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
            5/10 People
          </h1>
        </div>
      </div>

      <GroupsPopup show={showPopup} setShow={setPop}></GroupsPopup>
    </>
  );
}

export default GroupsButton;
