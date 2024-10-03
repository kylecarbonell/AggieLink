import React from "react"
import { useState } from "react"
import { groupTypes } from "../../Data/GroupData"


interface Props {
    showFilter: any
    filterType: any
    setFilter: any
    getGroups: any
    tempType: any,
    setTempType: any
}

function FilterGroupPopup(props: Props) {

    return (
        <>
            <div className="Groups-Popup-Container" style={props.showFilter ? { visibility: "visible" } : { visibility: "hidden" }}>
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
                                props.setTempType(e.target.value)
                            }}>
                                <option>Select</option>
                                {
                                    groupTypes.map((val, key) => {
                                        return <option value={val} key={key} >{val}</option>
                                    })
                                }
                            </select>

                            <h1 style={{ fontSize: "1rem", color: "var(--blue)" }}>
                                Event Type :
                            </h1>
                            <input className="Groups-Create-Group-Selects" onChange={
                                (e) => {
                                    props.setTempType(e.target.value)
                                }
                            } value={groupTypes.includes(props.tempType) || props.tempType == "Select" ? "" : props.tempType}></input>
                        </div>
                    </form>
                    <div className="Groups-Create-Group-Buttons" style={{ fontSize: "2rem", borderTop: "1px solid var(--yellow)" }}>
                        <div style={{ width: "20%", fontSize: "1rem" }} onClick={() => {
                            props.filterType.current = ""
                            props.setFilter(false)
                        }}>Clear Filters</div>
                        <div style={{ width: "20%", fontSize: "1rem" }} onClick={() => {
                            props.setFilter(false)
                        }}>Cancel</div>
                        <div style={{ width: "20%", fontSize: "0.8rem" }} onClick={() => {
                            props.filterType.current = props.tempType
                            props.getGroups()
                            props.setFilter(false)
                            props.setTempType("")
                        }}>Filter Groups</div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default FilterGroupPopup