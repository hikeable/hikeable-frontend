import React, { useState, useEffect } from "react";
import Mountain from "../public/mountain.svg";

function Landing() {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const divTimer = setTimeout(() => {
      setIsDivVisible(true);
    }, 1000);

    const buttonTimer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 2000);

    return () => {
      clearTimeout(divTimer);
      clearTimeout(buttonTimer);
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
          isDivVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in-out grid grid-cols-2 absolute w-2/5 h-1/4 top-50 left-50 bg-lime-800 rounded-2xl`}
      >
        <div className="flex flex-col justify-center items-center">
          <Mountain className="w-1/3 h-1/3 fill-slate-100 drop-shadow-md" />
          <span className="text-6xl font-bold text-slate-100 drop-shadow-md">
            Hikeable
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="px-4">
            <p className="leading-relaxed text-md text-slate-100 font-medium">
              Experience Japan&apos;s beauty with <strong>Hikeable</strong> -
              the ultimate hiking app. Connect with fellow adventurers, leave
              trailside messages, and uncover new horizons.
            </p>
          </div>
          <div>
            <button
              className={`${
                isButtonVisible ? "opacity-100" : "opacity-0"
              } mt-5 text-lg rounded-xl font-semibold drop-shadow-md cursor-pointer bg-slate-100 text-lime-800 px-8 py-2 transition-all duration-500 ease-in-out border-2 hover:bg-lime-800 hover:text-slate-100 hover:border-slate-100`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
