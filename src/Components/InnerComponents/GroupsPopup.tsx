import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { call } from "../../Data/GroupData";

interface Info {
    show: Boolean
    setShow: (Boolean) => void
    max_users: String;
    topic: String;
    title: String;
    city: String;
    loc: String;
    users: Array<Object>;
    start_time: any
    end_time: any;
    _id: String;
    date: String,
    emails: Array<Object>
}

function GroupsPopup(info: Info) {
    const [emails, setEmails] = useState<any>([])
    const [users, setUser] = useState<any>([]);

    const [error, setError] = useState<any>("")

    useEffect(() => {
        const int = setInterval(() => {
            setError("")
        }, 10000)

        return () => clearInterval(int)
    }, [])

    useEffect(() => {
        // console.log("user in popup")
        // setUser(info.users)
        setEmails(info.emails)
        getUser(info.emails)
    }, [info.show])

    useEffect(() => {
        info.setShow(false)
    }, [])

    useEffect(() => {
        getUser(emails)
    }, [emails])


    const joinGroup = async () => {
        if (users.length != info.max_users) {
            const data = JSON.parse(window.localStorage.getItem("Data") || "{}")
            // console.log(data)
            const result = await fetch(`${call}/addToGroup`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: data, _id: info._id })
            }).then(async (res) => {
                if (res.status == 201) {
                    setError("Already in group")
                }

                const json = await res.json()
                console.log("POPUP JOIN GROUP JSON")
                console.log(json)
                getUser(json)


                console.log("USERS", users.length)
                if (users.length >= info.max_users) {
                    deleteGroup()
                }


            })
        } else {
            setError("Group is currently full")
        }

    }

    const deleteGroup = async () => {
        const data = JSON.parse(window.localStorage.getItem("Data") || "{}")
        await fetch(`${call}/deleteGroup`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: data, _id: info._id })
        }).then((res) => {
            if (res.status == 200) {
                console.log("ALL GOOD")
                info.setShow(false)
            }
        })
    }



    const leaveGroup = async () => {
        const data = JSON.parse(window.localStorage.getItem("Data") || "{}")
        // console.log(data)
        const result = await fetch(`${call}/leaveGroup`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: data, _id: info._id })
        }).then(async (res) => {
            if (res.status == 201) {
                setError("Not in group")
            }

            const json = await res.json()
            console.log("POPUP JOIN GROUP JSON")
            console.log(json)

            if (json.length == 0 || json.length >= info.max_users) {
                deleteGroup()
            } else {
                getUser(json)
            }


        })
    }

    const getUser = async (em: any) => {
        const result = await fetch(`${call}/getUser?doc=${em}`).then(async (res) => {
            const json = await res.json()
            // console.log("USERS")
            // console.log(json)

            setUser(json)
        });

    }



    return (
        <>
            {info.show &&
                <div className="Groups-Popup-Container">
                    <div className="Groups-Popup-Window">
                        <h1 id="Popup-Text" style={{ textAlign: "center" }}>{info.title}</h1>

                        <div className="Groups-Popup-Info">
                            <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>Location</h1>
                            <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>City</h1>
                            <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>Members</h1>
                            <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>Date</h1>
                            <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>Time</h1>

                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.loc}</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.city}</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{users.length || 0} / {info.max_users}</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.date}</h1>
                            <h1 style={{ fontSize: "0.9rem", fontWeight: "normal", color: "var(--blue)" }}>{info.start_time + " - " + info.end_time}</h1>

                        </div>
                        <div className="Groups-Popup-Users">
                            {users.map((val: any, key: any) => {
                                console.log("THIS IS VAL REPEAT")
                                console.log(val)
                                if (val != null) {
                                    return (
                                        <div key={key}>
                                            <FaRegUserCircle style={{ color: "var(--blue)", fontSize: "3rem", marginRight: "2%" }}></FaRegUserCircle>
                                            <p style={{ color: "var(--blue)" }}>{val.first + " " + val.last}</p>
                                        </div>
                                    )
                                } else {
                                    return <div></div>
                                }

                            })}
                        </div>
                        <div className="Groups-Popup-Button-Container" >

                            {

                                (window.localStorage.getItem("Data") != "" && !window.localStorage.getItem("Data")?.includes(emails[0])) && <button className="Groups-Popup-Close-Button" onClick={() => leaveGroup()}>Leave Group</button>
                            }

                            {
                                window.localStorage.getItem("Data")?.includes(emails[0]) && <button className="Groups-Popup-Close-Button" onClick={() => deleteGroup()}>Disband Group</button>
                            }

                            <button className="Groups-Popup-Close-Button" onClick={() => info.setShow(!info.show)}>Close</button>
                            {
                                window.localStorage.getItem("Data") != "" && <button className="Groups-Popup-Close-Button" onClick={() => joinGroup()}>Join Group</button>
                            }


                        </div>
                        <div className="Groups-Popup-Button-Error">
                            {
                                window.localStorage.getItem("Data") == "" && <p style={{ color: "black" }}>Please Login to join this group!</p>
                            }
                            <p style={{ color: "black" }}>{error}</p>
                        </div>
                    </div>
                </div >
            }

        </>
    )
}

export default GroupsPopup;