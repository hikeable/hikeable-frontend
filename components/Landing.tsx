import React, { useState, useEffect } from "react";
import Mountain from "../public/mountain.svg";

function Landing() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const divTimer = setTimeout(() => {
      setIsDivVisible(true);
    }, 1000);

    return () => {
      clearTimeout(divTimer);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <video
        className="w-full h-full object-none"
        src="/videos/splash.mp4"
        autoPlay
        loop
        muted
      />
      <div
        className={`${
          isDivVisible ? "opacity-90" : "opacity-0"
        } transition-opacity duration-1000 border-lime-800 border-8 ease-in-out grid grid-cols-2 absolute w-1/2 h-1/2 top-50 left-50 bg-white rounded-xl`}
      >
        <div className="flex flex-col justify-center items-center">
          <Mountain className="w-1/3 h-1/3 fill-lime-800 drop-shadow-md" />
          <span className="text-6xl font-bold text-lime-800 drop-shadow-md">
            Hikeable
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>
            Discover the untamed beauty of Japan like never before with Hikeable
            - the ultimate hiking companion that connects you with fellow
            adventurers and lets you leave trailside messages along the way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
