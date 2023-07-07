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
      <div
        className="absolute grid grid-cols-1 lg:grid-cols-2
        w-11/12 md:w-2/3 lg:w-3/4 xl:w-1/2
        h-auto
        gap-4 px-4 py-8
       bg-lime-800 rounded-2xl
       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md"
      >
        <div className="flex flex-row gap-2 justify-center items-center">
          <Mountain
            className="
          w-24 h-24
          md:w-24 md:h-24
          
          fill-slate-100 drop-shadow-md"
          />
          <span
            className="
          hidden
          md:inline-block
          md:text-6xl
          lg:text-4xl

          font-bold text-slate-100 drop-shadow-md tracking-wide"
          >
            Hikeable
          </span>
        </div>
        <div className="flex flex-col gap-6 justify-start lg:justify-center items-center text-slate-100">
          <header>
            <h1
              className="text-base md:text-2xl lg:text-lg
            font-bold tracking-wide"
            >
              &quot;Hiking in Japan. Simplified.&quot;
            </h1>
          </header>
          <section>
            <p className="text-sm md:text-lg lg:text-base font-medium">
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
              } rounded-xl font-semibold drop-shadow-md cursor-pointer bg-slate-100 text-lime-800 px-8 py-4 lg:py-2 transition-all duration-300 ease-in-out border-2 hover:bg-lime-800 hover:text-slate-100 hover:border-slate-100`}
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
      <footer className="w-full py-2 bg-slate-100 bg-gradient-to-b from-slate-200 to-transparent absolute bottom-0 flex justify-center items-center">
        <span className="text-slate-900">Hikeable &copy; {currentYear}</span>
      </footer>
    </div>
  );
}

export default Landing;
