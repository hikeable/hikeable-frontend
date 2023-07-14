import React, { useState } from "react";
import Mountain from "../public/mountain.svg";
import Hamburger from "./Hamburger";
import { useRouter } from "next/router";

export default function NewNavbar() {
  const router = useRouter();
  const navLinks = [
    {
      key: 1,
      name: "Map",
      path: "/prefectures",
    },
    {
      key: 2,
      name: "About",
      path: "/about",
    },
    {
      key: 3,
      name: "Login",
      path: "/login",
    },
  ];
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  function handleNavClick(path: string) {
    router.push(path);
  }

  function handleHamburgerClick() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  return (
    <header className="bg-slate-100 w-full h-16 py-3 px-6 flex flex-row items-center justify-between drop-shadow-md">
      <section
        className="flex flex-row gap-2 justify-center items-center hover:cursor-pointer"
        onClick={() => handleNavClick("/")}
      >
        <Mountain className="fill-lime-800" />
        <span className="text-lime-800 font-semibold text-4xl">Hikeable</span>
      </section>
      <nav className="flex items-center">
        <button className="inline md:hidden" onClick={() => handleHamburgerClick()}>
          <Hamburger isHamburgerOpen={isHamburgerOpen} />
        </button>
        <ul className="flex-row gap-6 hidden md:flex">
          {navLinks.map((link) => {
            return (
              <li
                key={link.key}
                onClick={() => handleNavClick(link.path)}
                className="hover:underline hover:cursor-pointer text-green-800 hover:text-green-700 text-lg font-semibold transition-all ease-in-out duration-50"
              >
                {link.name}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
