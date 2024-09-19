import Bar from "./InnerComponents/Bar";
import "../App.css";
import "./Groups.css";
import GroupsButton from "./InnerComponents/GroupsButton";

function Groups() {
  return (
    <>
      <div className="Groups-Page-Container">
        <Bar color={"white"} text={"blue"}></Bar>
        <div className="Groups-Create-Bar">
          <button className="Groups-Create-Bar-Button">Filter / Sort</button>
          <button className="Groups-Create-Bar-Button">Create Group</button>
        </div>
        <div className="Groups-Buttons-Container">
          <GroupsButton
            topic="Study"
            title="ECS 154A"
            loc="Shields"
            city="Davis, CA"
          />
          <GroupsButton
            topic="Sport"
            title="Grass Volleyball"
            loc="ARC"
            city="Davis, CA"
          />
          <GroupsButton
            topic="Sport"
            title="Grass Volleyball"
            loc="ARC"
            city="Davis, CA"
          />
          <GroupsButton
            topic="Sport"
            title="Grass Volleyball"
            loc="ARC"
            city="Davis, CA"
          />
        </div>
      </div>
    </>
  );
}

export default Groups;
