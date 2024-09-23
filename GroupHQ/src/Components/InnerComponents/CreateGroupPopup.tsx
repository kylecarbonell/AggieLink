import { useEffect, useState } from "react";

interface Props {
    show: Boolean;
    setShow: any
}

function CreateGroupPopup(props: Props) {


    async function submit() {
        let location = loc
        if (location == "") {
            location = "TBD"
        }

        let doc = {
            "group_type": group,
            "event_type": event,
            "city": city,
            "location": location,
            "num_people": num,
            "start_time": startTime[0] + startTime[1],
            "end_time": endTime[0] + endTime[1]
        }

        console.log(doc)

        await fetch(`http://localhost:8000/postGroup?doc=${JSON.stringify(doc)}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
        }).then(async (res) => {
            const text = await res.text();
            console.log(text)
            window.location.reload()
        });
    }

    const groupTypes = [
        "Sports",
        "Study Groups",
        "Coffee",
        "Food"
    ]

    const events: Record<string, string[]> = {
        "Sports": [
            "Volleyball",
            "Basketball",
            "Hiking",
            "Pickleball",
            "Gym",
            "Other"
        ],
        "Study Groups": [
            "Math",
            "English",
            "Biology",
            "Chemistry",
            "Computer Science",
            "Other"
        ],
        "Coffee": [
            "Coffee Shop"
        ],
        "Food": [
            "Restaurant",
            "Snack",
            "Fast Food"
        ]
    }

    const cities = [
        "Davis, Ca",
        "San Francisco, Ca",
        "San Jose, Ca",
        "Milpitas, Ca",
        "Palo Alto, Ca",
        "Sacramento, Ca"
    ]

    const number = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"
    ]

    const [group, setGroup] = useState<string>(groupTypes[0]);
    const [event, setEvent] = useState<string>(events[group][0]);
    const [city, setCity] = useState<string>(cities[0]);
    const [loc, setLoc] = useState<string>("");
    const [num, setNum] = useState<number>(0);


    const [startTime, setStart] = useState<any>([1, "AM"])
    const [endTime, setEnd] = useState<any>([2, "AM"])


    useEffect(() => {
        console.log(group)
    }, [group])

    return (<>
        <div className="Groups-Popup-Container" style={props.show ? { visibility: "visible" } : { visibility: "hidden" }}>
            <div className="Groups-Create-Group-Popup-Window">

                <div className="Groups-Create-Group-Title">
                    <h1 style={{ fontSize: "2rem", color: "var(--blue)" }}>Create Group</h1>
                </div>

                <form className="Groups-Create-Group-Dropdowns" onSubmit={() => submit()}>
                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "group" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Group Type :
                        </h1>
                        <select className="Groups-Create-Group-Selects" value={group} onChange={(e) => {
                            setGroup(e.target.value)
                        }}>
                            {
                                groupTypes.map((val, key) => {
                                    return <option value={val} key={key} >{val}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "event" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Event :
                        </h1>
                        <select className="Groups-Create-Group-Selects" onChange={(e) => {
                            setEvent(e.target.value)
                        }}>
                            {
                                events[group].map((val, key) => {
                                    return <option value={val} key={key}>{val}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "city" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            City :
                        </h1>
                        <select className="Groups-Create-Group-Selects" onChange={(e) => {
                            setCity(e.target.value)
                        }}>
                            {
                                cities.map((val, key) => {
                                    return <option value={val} key={key}>{val}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "location" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Location :
                        </h1>
                        <input className="Groups-Create-Group-Selects" value={loc} onChange={(e) => {
                            setLoc(e.target.value.toUpperCase())
                            console.log(loc)
                        }}>

                        </input>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "people" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Number of People :
                        </h1>
                        <select className="Groups-Create-Group-Selects" value={num} onChange={(e) => {
                            setNum(Number.parseInt(e.target.value))
                        }}>
                            {
                                number.map((val, key) => {
                                    return <option value={val} key={key}>{val}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "time1" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Start Time :
                        </h1>
                        <select className="Groups-Create-Group-Selects " value={startTime[0]} style={{ width: "60%" }} onChange={(e) => {
                            setStart([Number.parseInt(e.target.value), startTime[1]])
                        }}>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val, key) => {
                                    return <option value={val} key={key}>{val}</option>
                                })
                            }
                        </select>
                        <select className="Groups-Create-Group-Selects" value={startTime[1]} style={{ width: "30%", marginLeft: "2%" }} onChange={(e) => {
                            setStart([startTime[0], e.target.value])
                        }}>
                            <option value={"AM"}>AM</option>
                            <option value={"PM"}>PM</option>
                        </select>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "time2" }} >
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            End Time :
                        </h1>
                        <select className="Groups-Create-Group-Selects " value={endTime[0]} style={{ width: "60%" }} onChange={(e) => {
                            setEnd([Number.parseInt(e.target.value), endTime[1]])
                        }} >
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val, key) => {
                                    return <option value={val} key={key}>{val}</option>
                                })
                            }
                        </select>
                        <select className="Groups-Create-Group-Selects" value={endTime[1]} style={{ width: "30%", marginLeft: "2%" }} onChange={(e) => {
                            setEnd([endTime[0], e.target.value])
                        }}>
                            <option value={"AM"}>AM</option>
                            <option value={"PM"}>PM</option>
                        </select>
                    </div>

                </form>
                <div className="Groups-Create-Group-Buttons" style={{ fontSize: "2rem", borderTop: "1px solid var(--yellow)" }}>
                    <div onClick={() => {
                        props.setShow(false)
                        setGroup(groupTypes[0])
                        setCity(cities[0])
                        setLoc("")
                        setNum(0)
                    }}>Cancel</div>
                    <div onClick={() => submit()}>Create Group</div>
                </div>
            </div>
        </div >
    </>)
}

export default CreateGroupPopup;