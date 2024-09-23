import Bar from "./InnerComponents/Bar";
import "./Accounts.css"
import { useState } from "react";
import React from "react";

function Accounts() {
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const onSubmit = async (e: any) => {
        if (email == "" || pw == "") {
            alert("Invalid login information")
            return
        }

        e.preventDefault()

        const data = { email: email, pw: pw }
        await fetch(`http://localhost:8000/getAccount?data=${JSON.stringify(data)}`).then((res) => {
            if (res.status == 200) {
                console.log("logged in")
            } else {
                console.log("Invalid")
            }
        });
        //Fetch server to authenticate
    }

    return (
        <>
            <div className="Accounts-Page-Container">
                <Bar color={"white"} text={"blue"}></Bar>
                <div className="Accounts-Login-Container">
                    <form className="Accounts-Login">
                        <h1 style={{ color: "var(--blue)" }}>Login</h1>
                        <label className="Accounts-Login-Input">
                            Email
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }}></input>
                        </label>
                        <label className="Accounts-Login-Input">
                            Password
                            <input onChange={(e) => {
                                setPw(e.target.value)
                            }}></input>
                        </label>
                        <button onClick={(e) => onSubmit(e)}>Login</button>
                    </form>
                </div>

            </div >

        </>
    )
}

export default Accounts;