import React, { useState, useEffect } from "react";
import Mountain from "../public/mountain.svg";
import { useRouter } from "next/router";

function Landing() {
  const router = useRouter();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const currentYear = new Date().getFullYear();

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
      <div className="absolute grid grid-cols-1 gap-4 lg:gap-0 xl:grid-cols-2 xl:w-1/2 xl:h-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-lime-800 rounded-2xl p-4">
        <div className="flex flex-col justify-center items-center">
          <Mountain className="w-24 h-24 fill-slate-100 drop-shadow-md" />
          <span className="text-5xl font-bold text-slate-100 drop-shadow-md">
            Hikeable
          </span>
        </div>
        <div className="flex flex-col gap-4 justify-center items-center text-slate-100">
          <header>
            <h1 className="text-xl font-bold">
              &quot;Hiking. Simplified.&quot;
            </h1>
          </header>
          <section>
            <p className="xl-text-md font-medium">
              Experience Japan&apos;s beauty with <strong>Hikeable</strong> -
              the ultimate hiking app. Connect with fellow adventurers, leave
              trailside messages, and uncover new horizons.
            </p>
          </section>
          <nav>
            <button
              onClick={() => router.push("/prefectures")}
              className={`${
                isButtonVisible ? "opacity-100" : "opacity-0"
              } rounded-xl font-semibold drop-shadow-md cursor-pointer bg-slate-100 text-lime-800 px-8 py-2 transition-all duration-300 ease-in-out border-2 hover:bg-lime-800 hover:text-slate-100 hover:border-slate-100`}
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
      <footer className="w-full py-2 bg-slate-100 bg-gradient-to-b from-slate-200 to-transparent absolute bottom-0 flex justify-center items-center">
        <span className="text-slate-900">
          Hikeable &copy; {currentYear} All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}

export default Landing;
