/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Container } from "@mui/material";
import styles from "../styles/prefectures.module.css";

const engPrefNames = {
  北海道: "Hokkaido",
  青森県: "Aomori",
  岩手県: "Iwate",
  宮城県: "Miyagi",
  秋田県: "Akita",
  山形県: "Yamagata",
  福島県: "Fukushima",
  茨城県: "Ibaraki",
  栃木県: "Tochigi",
  群馬県: "Gunma",
  埼玉県: "Saitama",
  千葉県: "Chiba",
  東京都: "Tokyo",
  神奈川県: "Kanagawa",
  新潟県: "Niigata",
  富山県: "Toyama",
  石川県: "Ishikawa",
  福井県: "Fukui",
  山梨県: "Yamanashi",
  長野県: "Nagano",
  岐阜県: "Gifu",
  静岡県: "Shizuoka",
  愛知県: "Aichi",
  三重県: "Mie",
  滋賀県: "Shiga",
  京都府: "Kyoto",
  大阪府: "Osaka",
  兵庫県: "Hyogo",
  奈良県: "Nara",
  和歌山県: "Wakayama",
  鳥取県: "Tottori",
  島根県: "Shimane",
  岡山県: "Okayama",
  広島県: "Hiroshima",
  山口県: "Yamaguchi",
  徳島県: "Tokushima",
  香川県: "Kagawa",
  愛媛県: "Ehime",
  高知県: "Kochi",
  福岡県: "Fukuoka",
  佐賀県: "Saga",
  長崎県: "Nagasaki",
  熊本県: "Kumamoto",
  大分県: "Oita",
  宮崎県: "Miyazaki",
  鹿児島県: "Kagoshima",
  沖縄県: "Okinawa",
};

const prefectures = () => {
  const router = useRouter();
  const loadingLog = useRef(false);

  useEffect(() => {
    if (loadingLog.current === false) {
      loadingLog.current = true;

      window.svgJapan({
        element: "#my-map-container",
        uniformly: false,
        uniformColor: "#00984F",
        width: "auto",
        height: "calc(100vh - 120px)",
        regionality: true,
        type: "deform",
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

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <div className="bg__map">
        <h1>Where do you want to walk next?</h1>
        <Link
          className={styles.link__all}
          href={{
            pathname: "trails/[pref]",
            query: { pref: "all" },
          }}
        >
          <h2 className={styles.txt__link}>
            {" "}
            Not sure where to go?🤔 See all trails
          </h2>
        </Link>
        <div id="my-map-container"></div>
      </div>
    </Container>
  );
};

export default prefectures;
