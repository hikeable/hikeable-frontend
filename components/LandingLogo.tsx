import Mountain from "../public/mountain_2.svg";
import styles from "../styles/landinglogo.module.css";

export const LandingLogo = () => {
  return (
    <>
      <div className={styles.logo__wrapper}>
        <Mountain className={styles.logo} />
        <div className={styles.logo__name}>Hikeable</div>
      </div>
    </>
  );
};
