import React, { useState, useEffect } from "react";
import Mountain from "../public/mountain.svg";

function Landing() {
  const [isClear, setIsClear] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClear(true);
    }, 1000);
  }, []);

  return (
    <div
      className={`${
        isClear ? "opacity-100" : "opacity-0"
      } w-screen h-screen transition-opacity duration-1000 ease-in-out flex justify-center items-center`}
    >
      <video
        className="w-full h-full object-none"
        src="/videos/splash.mp4"
        autoPlay
        loop
        muted
      />
      <div className="grid grid-cols-2 absolute w-1/2 h-1/2 top-50 left-50 bg-white rounded-xl shadow-md opacity-90">
        <div className="flex flex-col justify-center items-center">
          <Mountain className="w-1/3 h-1/3 fill-lime-900 drop-shadow-md" />
          <span className="text-6xl font-bold text-lime-900 drop-shadow-md">Hikeable</span>
        </div>
        <p>Test 2</p>
      </div>
    </div>
  );
}

export default Landing;
