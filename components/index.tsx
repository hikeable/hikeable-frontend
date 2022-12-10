export * from "./CompletedTrails";
export * from "./context/UserAuth";
export * from "./Filter";
export * from "./Likes";
export * from "./TrailCard";
export * from "./Navbar";
export * from "./login";
export * from "./Landing";

import dynamic from "next/dynamic";

export const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

