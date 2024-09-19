import { NavLink } from "react-router-dom";

interface Props {
  color: String;
  text: String;
}

function Bar(props: Props) {
  return (
    <>
      <div
        className="Main-Page-Bar"
        style={{ backgroundColor: `var(--${props.color})` }}
      >
        <h1
          style={{
            justifyContent: "left",
            marginLeft: "50px",
            userSelect: "none",
            color: `var(--${props.text})`,
          }}
        >
          Group HQ
        </h1>
        <NavLink to="/">
          <h1
            id="Bar-Title"
            style={{ color: `var(--${props.text})` }}
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
            style={{ color: `var(--${props.text})` }}
            onClick={() => {
              console.log("HELLO");
            }}
          >
            Groups
          </h1>
        </NavLink>

        <h1
          id="Bar-Title"
          style={{ color: `var(--${props.text})` }}
          onClick={() => {
            console.log("HELLO");
          }}
        >
          Account
        </h1>
      </div>
    </>
  );
}

export default Bar;
