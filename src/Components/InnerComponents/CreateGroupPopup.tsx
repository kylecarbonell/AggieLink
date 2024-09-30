import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { call, cities, events, groupTypes } from "../../Data/GroupData";

interface Props {
    show: Boolean;
    setShow: any;
    getGroup: any
}

function CreateGroupPopup(props: Props) {
    const [group, setGroup] = useState<string>(groupTypes[0]);
    const [event, setEvent] = useState<string>(events[group][0]);
    const [city, setCity] = useState<string>(cities[0]);
    const [num, setNum] = useState("");

    const [inputLoc, setInputLoc] = useState("")

    const finalLoc = useRef("");
    const [locOptions, setOptions] = useState<Array<String>>([]);


    const [startTime, setStart] = useState<any>({})
    const [endTime, setEnd] = useState<any>({})

    const [start, setStartValue] = useState('')
    const [end, setEndValue] = useState('')


    useEffect(() => {
        setEvent(events[group][0])
    }, [group])

    useEffect(() => {
        console.log(event)
    }, [event])

    useEffect(() => {
        if (locOptions.length > 0) {
            finalLoc.current = locOptions[0][0]
        } else {
            finalLoc.current = ""
        }
    }, [locOptions])

    async function GetLocation(area: string) {
        await fetch(`${call}/getLoc?loc=${area}`).then(async (result) => {
            const json = await result.json()
            setOptions(json)
        })
    }

    function resetValue() {
        props.setShow(false)
        setGroup(groupTypes[0])
        setCity(cities[0])
        setNum("")
        setOptions([])
        setInputLoc("")
        setStartValue("")
        setEndValue("")
    }

    async function submit() {
        let user = JSON.parse(window.localStorage.getItem("Data") || "{}")

        if (JSON.stringify(user) == "{}") {
            alert("Please log in to create a group!")
            return
        } 

        // console.log("THIS IS LOCATION NOW " + finalLoc.current)
        if (finalLoc.current == "") {
            alert("Please enter a location")
            return
        }

        if (num == "" || Number.parseInt(num) < 2) {
            alert("Please enter a number of people greater than 2")
            return
        }

        let doc = {
            "group_type": group,
            "event_type": event,
            "city": city,
            "location": finalLoc.current,
            "num_people": num,
            "start_time": startTime.time,
            "end_time": endTime.time,
            "start_date": startTime.date,
            "end_date": endTime.date,  
            "users": [user?.email]
        }

        console.log(doc)

        await fetch(`${call}/postGroup`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ doc: doc })
        }).then(async (res) => {
            const text = await res.text();

            if (res.status == 200) {
                console.log(text)
                resetValue()
                props.getGroup()
            } else {
                alert("Error creating your group")
            }
        });
    }



    return (<>
        <div className="Groups-Popup-Container" style={props.show ? { visibility: "visible" } : { visibility: "hidden" }}>
            <div className="Groups-Create-Group-Popup-Window">

                <div className="Groups-Create-Group-Title">
                    <h1 style={{ fontSize: "2rem", color: "var(--blue)" }}>Create Group</h1>
                </div>

                <form className="Groups-Create-Group-Dropdowns">
                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "group" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Group Type :
                        </h1>
                        <select className="Groups-Create-Group-Selects" value={group} onChange={(e) => {
                            console.log(group)
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
                        {
                            group == "Other" ?
                                <input className="Groups-Create-Group-Selects" onChange={
                                    (e) => {
                                        setEvent(e.target.value)
                                    }
                                }></input>
                                : 
                                <select className="Groups-Create-Group-Selects" onChange={(e) => {
                                    setEvent(e.target.value)
                                }}>
                                    {
                                        events[group].map((val, key) => {
                                            return <option value={val} key={key}>{val}</option>
                                        })
                                    }
                                </select>
                        }

                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "city" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Location :
                        </h1>
                        <input className="Groups-Create-Group-Selects" onChange={(e) => {
                            setInputLoc(e.target.value)
                            GetLocation(e.target.value)
                            const temp = locOptions[0]

                            const city = temp[1].split(",")

                            setCity(city[1] + "," + city[2])


                        }} value={inputLoc}>
                        </input>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "location" }} >
                        {
                            locOptions.length != 0 &&
                            <select className="Groups-Create-Group-Selects" onChange={(e) => {
                                    // s(e.target.value)
                                }} >
                                    {locOptions.map((val, key) => {
                                        return <option>{val}</option>
                                    })}
                                </select>
                        }
                    </div>



                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "people" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Number of People :
                        </h1>
                        <input className="Groups-Create-Group-Selects" value={num} onChange={(e) => {
                            setNum(e.target.value)
                        }}>

                        </input>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "time1" }}>
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            Start Time :
                        </h1>
                        <input type="datetime-local" className="Groups-Create-Group-Selects" onChange={(e) => {
                            setStartValue(e.target.value)
                            const newDate = new Date(e.target.value)
                            const time = newDate.toLocaleTimeString().split(":");
                            // console.log(time[2].substring(2))

                            const date = newDate.toLocaleDateString();

                            const json = {
                                time: time[0] + ":" + time[1] + time[2].substring(2),
                                date: date
                            }

                            console.log(start)
                            setStart(json)

                        }} value={start}></input>
                    </div>

                    <div className="Groups-Create-Group-Select-Container" style={{ gridArea: "time2" }} >
                        <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                            End Time :
                        </h1>
                        <input type="datetime-local" className="Groups-Create-Group-Selects" style={{ color: "var(--blue)", colorScheme: "dark" }}
                            onChange={(e) => {
                                setEndValue(e.target.value)
                                const newDate = new Date(e.target.value)
                                const time = newDate.toLocaleTimeString().split(":");
                                // console.log(time[2].substring(2))

                                const date = newDate.toLocaleDateString();

                                const json = {
                                    time: time[0] + ":" + time[1] + time[2].substring(2),
                                    date: date
                                }

                                console.log(json)
                                setEnd(json)
                            }}
                            value={end}
                        ></input>
                    </div>

                </form>
                <div className="Groups-Create-Group-Buttons" style={{ fontSize: "2rem", borderTop: "1px solid var(--yellow)" }}>
                    <div onClick={() => {
                        resetValue()
                    }}>Cancel</div>
                    <div onClick={(e) => {
                        e.preventDefault()
                        submit()
                    }}>Create Group</div>
                </div>
            </div >
        </div >
    </>)
}

export default CreateGroupPopup;