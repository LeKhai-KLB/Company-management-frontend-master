import { memo } from "react";
import { UserInfoForm } from "~/Components/Form";
import { TUserInfo } from "~/services/authServices/authServices.types";
import styles from "./Profile.module.scss";
import { Section } from "~/Components/Section";
const userInfoFormData = {
  username: "Khai le ne",
  email: "Khailee1412@gmail.com",
  introduction: "Xin chào mình là Khải lê nè",
  create_at: new Date(),
} as TUserInfo;

export const Profile = memo(() => {
  return (
    <div className={styles["profile"]}>
      <Section title={"User info"}>
        <UserInfoForm formData={userInfoFormData} readOnly />
      </Section>
    </div>
  );
});
