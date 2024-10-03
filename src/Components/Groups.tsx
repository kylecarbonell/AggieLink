import Bar from "./InnerComponents/Bar";
import "../App.css";
import "./Groups.css";
import GroupsButton from "./InnerComponents/GroupsButton";
import { useEffect, useRef, useState } from "react";
import CreateGroupPopup from "./InnerComponents/CreateGroupPopup";
import React from "react";
import { call, groupTypes } from "../Data/GroupData";
import FilterGroupPopup from "./InnerComponents/FilterGroupPopup";

function Groups() {

  const [showCreate, setShowCreate] = useState(false);
  const [showFilter, setFilter] = useState(false)
  const [groups, setGroups] = useState<any>([])

  const [tempType, setTempType] = useState("")
  const filterType = useRef<string>("");

  /***
   * Makes a call to the backend to get available groups from the database.
   * Uses if statements to check if there contains a "filter" query
   * Updates the groups state to show available groups
   */
  const getGroups = async () => {
    let type = ""

    if (groupTypes.includes(filterType.current)) {
      type = "Group"
    } else {
      type = "Event"
    }

    const data = await fetch(`${call}/getGroups?query=${filterType.current}&type=${type}`);
    if (!data.ok) {
      console.log("ERROR")
      return
    }

    await data.json().then((json) => {
      setGroups(json)
    });

  };

  /***
   * Makes initial call to get available groups on render
   */
  useEffect(() => {
    getGroups()
  }, [])

  /***
   * Creates a timer to reload and get new groups
   */
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
        <Bar ></Bar>
        <div className="Groups-Create-Bar">
          <button onClick={() => setFilter(true)}>Filter</button>
          <button onClick={() => setShowCreate(true)}>Create Group</button>
        </div>
        <div className="Groups-Buttons-Container">
          {
            groups.length != 0 ?
              groups.map((val: any, key: any) => {
                return <GroupsButton key={key} topic={val.group_type} title={val.event_type} loc={val.location} city={val.city} users={val.users} max_users={val.num_people} end_time={val.end_time} _id={val._id} start_time={val.start_time} date={val.start_date} event={val.event_type}></GroupsButton>
              }) :
              <>
                <h1 style={{ width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", color: "var(--white)" }}>No {filterType.current} groups are currently available!</h1>
              </>
          }
        </div>
      </div>

      <CreateGroupPopup show={showCreate} setShow={setShowCreate} getGroup={getGroups}></CreateGroupPopup>
      <FilterGroupPopup showFilter={showFilter} setFilter={setFilter} getGroups={getGroups} filterType={filterType} tempType={tempType} setTempType={setTempType}></FilterGroupPopup>
    </>
  );
}

export default Groups;
