import React from "react";
import Mountain from "../public/mountain.svg";

export default function NewNavbar() {
  const navLinks = [
    {
      key: 1,
      name: "Map",
      path: "/",
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

  return (
    <header className="bg-slate-100 w-full h-16 py-2 px-4 flex flex-row items-center justify-between drop-shadow-md">
      <section className="flex flex-row gap-2 justify-center items-center hover:cursor-pointer">
        <Mountain className="fill-lime-800" />
        <span className="text-lime-800 font-semibold text-4xl">Hikeable</span>
      </section>
      <nav>
        <ul className="flex-row gap-6 hidden md:flex">
          {navLinks.map((link) => {
            return (
              <li
                key={link.key}
                className="hover:underline hover:cursor-pointer text-green-800 hover:text-green-700 font-semibold transition-all ease-in-out duration-50"
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
