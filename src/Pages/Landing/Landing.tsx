import { memo } from "react";
import { LazyImage } from "~/Components/Elements/LazyImage";
import styles from "./Landing.module.scss";
import img1 from "~assets/images/img1.png";
import img2 from "~assets/images/img2.png";
import img3 from "~assets/images/img3.png";

export const Landing = memo(() => {
  return (
    <div className={styles["landing"]}>
      <div className={styles["landing__img-container"]}>
        <div className={styles["landing__title"]}>
          Manage your work easier with{" "}
        </div>
        <img
          alt="1"
          className={styles["landing__img"]}
          style={{ marginRight: "24px" }}
          src={img1}
        />
        <img alt="2" className={styles["landing__img"]} src={img2} />
        <img alt="3" className={styles["landing__img"]} src={img3} />
      </div>
    </div>
  );
});
