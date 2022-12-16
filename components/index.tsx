export * from "./CompletedTrails";
export * from "./context/UserAuth";
export * from "./Filter";
export * from "./Likes";
export * from "./TrailCard";
export * from "./Navbar";
export * from "./login";
export * from "./Landing";
export * from "./Logo";
export * from "./TrailCardMobile";
export * from "./SinglePageBreadcrumbs";
export * from "./MessageForm";
export * from "./Weather";
export * from "./photoGallery";
export * from "./PhotoPageBreadcrumbs";

import dynamic from "next/dynamic";

export const SmallMap = dynamic(() => import("./SmallMap"), {
  ssr: false,
});

export const LargeMap = dynamic(() => import("./LargeMap"), {
  ssr: false,
});
