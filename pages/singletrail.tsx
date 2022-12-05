import { Box } from '@mui/material'
import styles from "../styles/singletrail.module.css";

const singletrail = () => {
  return (
    // Change to MUI
    <>
      <div className={styles.container}>
        <div className={styles["container-header"]}>
          <div className={styles["container-header--photo"]}>
            <img
              src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              alt="Placeholder"
              width={300}
              height={200}
            />
          </div>
          <div className={styles["container-header--description"]}>
            <h1>Trail Name</h1>
            <p>Prefecture Name</p>
            <p>Length</p>
            <p>Difficulty</p>
          </div>
        </div>
        <div className={styles["container-weather"]}>
          <p>5 Day Weather at Trail Name</p>
          <p>Forecast goes here</p>
        </div>
        <div className={styles["container-map"]}>
          <p>Around Map at Trail Name</p>
          <p>Map goes here</p>
        </div>
        <div className={styles["container-tips"]}>
          <div className={styles["container-tips--header"]}>
            <p>Tips for Trails from Experienced Hikers</p>
            <p>Add Tips</p>
          </div>
          <div className={styles["container-tips--content"]}>
            <p>From Haruna</p>
            <p>Stone stairs, and very slipper while and after raining!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default singletrail;
