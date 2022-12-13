export * from "./CompletedTrails";
export * from "./context/UserAuth";
export * from "./Filter";
export * from "./Likes";
export * from "./TrailCard";
export * from "./Navbar";
export * from "./login";
export * from "./Landing";
export * from "./Logo";

import dynamic from "next/dynamic";

export const TrailMap = dynamic(() => import("./TrailMap"), {
  ssr: false,
});

export * from "./photoGallery";
