import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

interface Info {
    show: Boolean
    setShow: (Boolean) => void
    max_users: String;
    topic: String;
    title: String;
    city: String;
    loc: String;
    users: Array<Object>;
    end_time: String;
    _id: String;
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
        setUser(info.users)
        setEmails(info.emails)
    }, [info.show])

    useEffect(() => {
        info.setShow(false)
    }, [])


    const joinGroup = async () => {
        const data = JSON.parse(window.localStorage.getItem("Data") || "{}")
        // console.log(data)
        const result = await fetch(`http://localhost:8000/addToGroup`, {
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
        })
    }

    const leaveGroup = async () => {
        const data = JSON.parse(window.localStorage.getItem("Data") || "{}")
        // console.log(data)
        const result = await fetch(`http://localhost:8000/leaveGroup`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: data, _id: info._id })
        }).then(async (res) => {
            if (res.status == 201) {
                setError("Not in group")
            }

            const json = await res.json()
            // console.log("POPUP JOIN GROUP JSON")
            // console.log(json)

            getUser(json)
        })
    }

    const getUser = async (emails) => {
        const result = await fetch(`http://localhost:8000/getUser?doc=${emails}`).then(async (res) => {


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
                            <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>End</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.loc}</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.city}</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.users.length || 0} / {info.max_users}</h1>
                            <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>{info.end_time}</h1>
                        </div>
                        <div className="Groups-Popup-Users">
                            {users.map((val: any, key: any) => {
                                return (
                                    <div key={key}>
                                        <FaRegUserCircle style={{ color: "var(--blue)", fontSize: "3rem", marginRight: "2%" }}></FaRegUserCircle>
                                        <p style={{ color: "var(--blue)" }}>{val.first + " " + val.last}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="Groups-Popup-Button-Container">
                            <button className="Groups-Popup-Close-Button" onClick={() => leaveGroup()}>Leave Group</button>
                            <button className="Groups-Popup-Close-Button" onClick={() => info.setShow(!info.show)}>Close</button>
                            <button className="Groups-Popup-Close-Button" onClick={() => joinGroup()}>Join Group</button>
                        </div>
                        <p style={{ color: "black" }}>{error}</p>
                    </div>
                </div >
            }

        </>
    )
}

export default GroupsPopup;