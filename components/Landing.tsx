import Image from "next/image";
import Link from "next/link";

import { Button } from "@mui/material";
import styles from "../styles/landing.module.css";

export const Landing = ({}) => {
  return (
    <>
      <div className={styles.landing__background}>
        <Image
          src="/michael-chiara-QlY4oiFbT9o-unsplash.webp"
          alt="Background Image of some people walking a trail"
          fill
          objectFit="cover"
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        />
      </div>
      <div className={styles.txt__wrapper}>
        <h1 className={styles.landing__title}>Hiking.Simplified</h1>
      </div>
      <div className={styles.btn__wrapper}>
        <Button variant="text" sx={{ mr: 2, ml: 1 }}>
          <Link
            className={`${styles.txt__btn} ${styles.btn__line}`}
            href="/prefectures"
          >
            Start Walking
          </Link>
        </Button>
      </div>
    </>
  );
};
