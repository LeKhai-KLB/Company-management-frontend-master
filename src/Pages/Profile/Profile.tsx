import { memo } from "react";
import { UserInfoForm } from "~/Components/Form";
import styles from "./Profile.module.scss";
import { BaseSection } from "~/Components/Section/BaseSection";
import { useAuthSelector } from "~/store/slices/authSlice";

export const Profile = memo(() => {
  const { user } = useAuthSelector();

  return (
    <div className={styles["profile"]}>
      <BaseSection title={"User info"} style={{ marginBottom: "8px" }}>
        <UserInfoForm formData={user} readOnly />
      </BaseSection>
    </div>
  );
});
