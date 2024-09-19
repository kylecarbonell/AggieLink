interface Props {
    show: Boolean
    setShow: any
}

function GroupsPopup(props: Props) {
    return (
        <>
            <div className="Groups-Popup-Container"
                style={props.show == false ? { display: "none" } : {}}
            >
                <div className="Groups-Popup-Window">
                    <h1 id="Popup-Text" style={{ textAlign: "center" }}>Grass Volleyball</h1>
                    <div className="Groups-Popup-Info">
                        <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>Location</h1>
                        <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>City</h1>
                        <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>Members</h1>
                        <h1 style={{ fontSize: "1rem", paddingTop: "10%", color: "var(--blue)" }}>End</h1>
                        <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>ARC</h1>
                        <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>Davis, Ca</h1>
                        <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>5/8</h1>
                        <h1 style={{ fontSize: "1rem", fontWeight: "normal", color: "var(--blue)" }}>12:58</h1>
                    </div>
                    <div className="Groups-Popup-Button-Container">
                        <button className="Groups-Popup-Close-Button" onClick={() => props.setShow(!props.show)}>Close</button>
                        <button className="Groups-Popup-Close-Button" onClick={() => props.setShow(!props.show)}>Join Group</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GroupsPopup;