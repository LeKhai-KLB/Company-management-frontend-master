import { memo } from "react";
import styles from "./Landing.module.scss";

export const Landing = memo(() => {
  return <div className={styles["landing"]}></div>;
});
