/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import Image from "next/image";
import { PrefList as MobilePrefList } from "./mobile/PrefList";
import { PrefList as BrowserPrefList } from "./desktop/PrefList";
import { Container, Box } from "@mui/material";
import { BrowserView, MobileView } from "react-device-detect";
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

// const engPrefArr = Object.values(engPrefNames);

const prefectures = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <div className={styles.bg__map}>
        <h1>Where do you want to walk next?</h1>
        <Link
          className={styles.link__all}
          href={{
            pathname: "trails/[pref]",
            query: { pref: "all" },
          }}
        >
          <h2 className={styles.txt__link}>
            Not sure where to go?🤔{" "}
            <span className={styles.span__underline}> See all trails</span>
          </h2>
        </Link>
        <BrowserView>
          <div className={styles.img__position__hiking}>
            <Image
              src={"/hiking.png"}
              alt="illustration of people hiking"
              width={500}
              height={500}
            />
          </div>
          <BrowserPrefList engPrefNames={engPrefNames} />
        </BrowserView>
        <MobileView>
          <MobilePrefList />
        </MobileView>
      </div>
    </Container>
  );
};

export default prefectures;
