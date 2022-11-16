import { memo } from "react";
import styles from "./Group.module.scss";
import { GroupSection } from "~/Components/Section/GroupSection";

export const Group = memo(() => {
  return (
    <div className={styles["group"]}>
      <GroupSection />
    </div>
  );
});
