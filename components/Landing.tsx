import React, { useState, useEffect } from "react";
import Mountain from "../public/mountain.svg";
import{ useRouter } from "next/router";

function Landing() {
  const router = useRouter();
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setIsButtonVisible(true);
    }, 1000);

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <video
        className="w-full h-full object-none"
        src="/videos/splash.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute grid grid-cols-1 xl:grid-cols-2 xl:w-1/2 xl:h-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-800 rounded-2xl p-4">
        <div className="flex flex-col justify-center items-center">
          <Mountain className="xl:w-1/2 xl:h-1/2 fill-slate-100 drop-shadow-md" />
          <p className="xl:text-5xl font-bold text-slate-100 drop-shadow-md">
            Hikeable
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div>
            <p className="xl:text-lg leading-relaxed text-slate-100 font-medium">
              Experience Japan&apos;s beauty with <strong>Hikeable</strong> -
              the ultimate hiking app. Connect with fellow adventurers, leave
              trailside messages, and uncover new horizons.
            </p>
          </div>
          <div>
            <button
              onClick={() => router.push("/prefectures")}
              className={`${
                isButtonVisible ? "opacity-100" : "opacity-0"
              } xl:text-lg rounded-xl font-semibold drop-shadow-md cursor-pointer bg-slate-100 text-lime-800 px-8 py-2 transition-all duration-300 ease-in-out border-2 hover:bg-lime-800 hover:text-slate-100 hover:border-slate-100`}
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
