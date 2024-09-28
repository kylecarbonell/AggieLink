import Bar from "./InnerComponents/Bar";
import "../App.css";
import "./Groups.css";
import GroupsButton from "./InnerComponents/GroupsButton";
import { useEffect, useRef, useState } from "react";
import CreateGroupPopup from "./InnerComponents/CreateGroupPopup";
import React from "react";
import { groupTypes } from "../Data/GroupData";

function Groups() {

  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setFilter] = useState(false)
  const [groups, setGroups] = useState<any>([])

  const [tempType, setTempType] = useState("")
  const filterType = useRef<String>();

  const getGroups = async () => {
    if (filterType.current == "Select") {
      filterType.current = ""
    }

    const data = await fetch(`http://localhost:8000/getGroups?query=${filterType.current}`);

    if (!data.ok) {
      console.log("ERROR")
      return
    }

    await data.json().then((json) => {
      setGroups(json)
      // console.log(json)
    });

  };

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    const groupInt = setInterval(() => {
      // console.log("tick")
      if (!showCreate) {
        console.log()
        getGroups()
      }
    }, 1500)

    return () => clearInterval(groupInt)
  }, [])

  return (
    <>
      <div className="Groups-Page-Container">
        <Bar color={"white"} text={"blue"}></Bar>
        <div className="Groups-Create-Bar">
          <button className="Groups-Create-Bar-Button" onClick={() => { setFilter(true) }}>Filter / Sort</button>
          <button className="Groups-Create-Bar-Button" onClick={() => setShowCreate(true)}>Create Group</button>
        </div>
        <div className="Groups-Buttons-Container">
          {
            groups.length != 0 ?
              groups.map((val: any, key: any) => {
                // console.log(groups)
                return <GroupsButton key={key} topic={val.group_type} title={val.event_type} loc={val.location} city={val.city} users={val.users} max_users={val.num_people} end_time={val.end_time} _id={val._id}></GroupsButton>
              }) :
              <h1 style={{ width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--white)" }}>No groups are currently available!</h1>
          }
        </div>
      </div>

      <CreateGroupPopup show={showCreate} setShow={setShowCreate} ></CreateGroupPopup>
      <div className="Groups-Popup-Container" style={showFilter ? { visibility: "visible" } : { visibility: "hidden" }}>
        <div className="Groups-Create-Group-Popup-Window" style={{ width: "40%", height: "60%" }}>
          <div className="Groups-Create-Group-Title">
            <h1 style={{ fontSize: "2rem", color: "var(--blue)" }}>Filter Group</h1>

          </div>
          <form className="Groups-Create-Group-Dropdowns">
            <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "group" }}>
              <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                Group Type :
              </h1>
              <select className="Groups-Create-Group-Selects" onChange={(e) => {
                setTempType(e.target.value)
              }}>
                <option>Select</option>
                {
                  groupTypes.map((val, key) => {
                    return <option value={val} key={key} >{val}</option>
                  })
                }
              </select>
            </div>
          </form>
          <div className="Groups-Create-Group-Buttons" style={{ fontSize: "2rem", borderTop: "1px solid var(--yellow)" }}>
            <div style={{ width: "20%", fontSize: "1rem" }} onClick={() => {
              filterType.current = ""
              setFilter(false)
            }}>Clear Filters</div>
            <div style={{ width: "20%", fontSize: "1rem" }} onClick={() => {
              setFilter(false)
            }}>Cancel</div>
            <div style={{ width: "20%", fontSize: "0.8rem" }} onClick={() => {
              filterType.current = tempType
              getGroups()
              setFilter(false)
            }}>Filter Groups</div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Groups;
