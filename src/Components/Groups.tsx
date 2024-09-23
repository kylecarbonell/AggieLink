import Bar from "./InnerComponents/Bar";
import "../App.css";
import "./Groups.css";
import GroupsButton from "./InnerComponents/GroupsButton";
import { useEffect, useState } from "react";
import CreateGroupPopup from "./InnerComponents/CreateGroupPopup";

function Groups() {

  const [showCreate, setShowCreate] = useState(false);
  const [groups, setGroups] = useState<any>([])

  const getGroups = async () => {
    console.log("FETCHING")
    const data = await fetch(`http://localhost:8000/getGroups`);

    if (!data.ok) {
      console.log("ERROR")
      return
    }

    await data.json().then((json) => {
      setGroups(json)
      console.log(json)
    });

  };

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    const groupInt = setInterval(() => {
      console.log("tick")
      if (!showCreate) {
        console.log("NO TICK")
        getGroups()
      }
    }, 5000)

    return () => clearInterval(groupInt)
  })



  return (
    <>
      <div className="Groups-Page-Container">
        <Bar color={"white"} text={"blue"}></Bar>
        <div className="Groups-Create-Bar">
          <button className="Groups-Create-Bar-Button">Filter / Sort</button>
          <button className="Groups-Create-Bar-Button" onClick={() => setShowCreate(true)}>Create Group</button>
        </div>
        <div className="Groups-Buttons-Container">
          {
            groups.map((val: any) => {
              return <GroupsButton topic={val.group_type} title={val.event_type} loc={val.location} city={val.city}></GroupsButton>
            })
          }
        </div>
      </div>

      <CreateGroupPopup show={showCreate} setShow={setShowCreate}></CreateGroupPopup>
    </>
  );
}

export default Groups;
