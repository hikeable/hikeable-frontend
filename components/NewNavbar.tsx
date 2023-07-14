import React from "react";
import Mountain from "../public/mountain.svg";

export default function NewNavbar() {
  return (
    <div className="bg-slate-100 w-full h-20 flex flex-row items-center justify-between">
      <div className="flex flex-row gap-2 justify-center items-center">
        <Mountain className="fill-lime-800" />
        <span className="text-lime-800 font-semibold ">Hikeable</span>
      </div>
    </div>
  );
}
