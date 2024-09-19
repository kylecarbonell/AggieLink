import "../Groups.css";
import { FiBookOpen } from "react-icons/fi";
import { TfiBasketball } from "react-icons/tfi";

interface props {
  topic: String;
  title: String;
  city: String;
  loc: String;
}

function GroupsButton(props: props) {
  function getTopic(topic: String) {
    if (topic == "Study") {
      return <FiBookOpen></FiBookOpen>;
    } else if (topic == "Sport") {
      return <TfiBasketball></TfiBasketball>;
    }
  }

  return (
    <>
      <div className="Groups-Button">
        <div className="Groups-Button-Icon">{getTopic(props.topic)}</div>
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
              marginTop: "10%",
              fontWeight: "normal",
            }}
          >
            5/10 People
          </h1>
        </div>
      </div>
    </>
  );
}

export default GroupsButton;
