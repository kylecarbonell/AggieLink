import { useEffect, useRef, useState } from "react";

import "./App.css";
import Bar from "./Components/InnerComponents/Bar";
import React from "react";

function App() {
  const imgCount = useRef<number>(0);
  const [panoCount, setCount] = useState(0);

  useEffect(() => {
    const picInt = setInterval(() => {
      if (imgCount.current == 4) {
        imgCount.current = 0;
      } else {
        imgCount.current += 1;
      }

      setCount(imgCount.current);
      // console.log(imgCount.current);
    }, 2000);

    return () => clearInterval(picInt);
  }, []);

  return (
    <>
      <div className="Page-Container">
        <Bar></Bar>
        <div className="Main-Page-Content">
          <div className="Main-Page-Image">
            <img
              src={`./PanoImages/pano${panoCount}.jpg`}
              style={{ height: "100%", width: "100%" }}
            ></img>
          </div>
          <div className="Main-Page-Welcome-Text-Box">
            <h1
              style={{
                color: "var(--white)",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Welcome!
            </h1>
            <p
              style={{
                color: "var(--white)",
                fontSize: "1rem",
                textAlign: "center",
                width: "60%",

                display: "flex",
                flexDirection: "column",
              }}
            >
              Welcome to UC Davis' AggieLink! With this website you are able to
              find any kind of group located in your area. Whether it be a
              sports group, a study group, and a friend to hang out with, this
              is the place to find it!


            </p>
            <button style={{ backgroundColor: "var(--white)", color: "var(--blue)" }} onClick={() => {
              window.open("https://github.com/kylecarbonell/AggieLink")
            }}>Click here to view GitHub Page</button>
          </div>
        </div>
        {/* <div className="Main-Page-Footer">
          <h1>HI</h1>
        </div> */}
      </div>
    </>
  );
}

export default App;
