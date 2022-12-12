import Mountain from "../public/mountain.svg";
import styles from "../styles/logo.module.css";

export const Logo = () => {
  return (
    <>
      <div className={styles.logo__wrapper}>
        <Mountain className={styles.logo} />
        <div className={styles.logo__name}>Hikeable</div>
      </div>
    </>
  );
};
