import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

export function PrefList(props) {
  const engPrefNames = { props };

  const router = useRouter();
  const loadingLog = useRef(false);

  useEffect(() => {
    if (loadingLog.current === false) {
      loadingLog.current = true;

      window.svgJapan({
        element: "#my-map-container",
        uniformly: true,
        uniformColor: "#00984F",
        // width: "auto",
        height: "calc(100vh - 120px)",
        regionality: true,
        type: "deform",
        width: "100vw",
        regions: [
          {
            id: 1,
            name: "Hokkaido",
            prefs: [1],
            color: "#689ECA",
            active: "#F3FF15",
          },
          {
            id: 2,
            name: "Tohoku",
            prefs: [2, 3, 4, 5, 6, 7],
            color: "#4DA9CE",
            active: "#F3FF15",
          },
          {
            id: 3,
            name: "Kanto",
            prefs: [8, 9, 10, 11, 12, 13, 14],
            color: "#9899C9",
            active: "#F3FF15",
          },
          {
            id: 4,
            name: "Chubu & Hokuriku",
            prefs: [15, 16, 17, 18, 19, 20, 21, 22, 23],
            color: "#9AD47F",
            active: "#F3FF15",
          },
          {
            id: 5,
            name: "Kinki",
            prefs: [24, 25, 26, 27, 28, 29, 30],
            color: "#B3DD53",
            active: "#F3FF15",
          },
          {
            id: 6,
            name: "Chugoku",
            prefs: [31, 32, 33, 34, 35],
            color: "#ECDD28",
            active: "#F3FF15",
          },
          {
            id: 7,
            name: "Shikoku",
            prefs: [36, 37, 38, 39],
            color: "#FDB42A",
            active: "#F3FF15",
          },
          {
            id: 8,
            name: "Kyushu & Okinawa",
            prefs: [40, 41, 42, 43, 44, 45, 46, 47],
            color: "#F96F39",
            active: "#F3FF15",
          },
        ],
      });

      const allPaths = document.querySelectorAll(".prefecture-map");

      allPaths.forEach((path) => {
        const jpName = path.getAttribute(
          "data-name"
        ) as keyof typeof engPrefNames;
        const engName = engPrefNames[jpName];
        path.setAttributeNS(null, "data-name", engName);

        path.addEventListener("click", function () {
          const trailPageURL = `trails/${engName.toLowerCase()}`;
          router.push(trailPageURL);
        });
      });
    }
  }, []);

  return <div id="my-map-container"></div>;
}
