import { ChangeEvent, memo, useState } from "react";
import { UserInfoForm } from "~/Components/Form";
import { TUserInfo } from "~/services/authServices/authServices.types";
import styles from "./Profile.module.scss";
import { Section } from "~/Components/Section";
import { GroupTabs } from "~/Components/Tabs/GroupTabs";
const userInfoFormData = {
  username: "Khai le ne",
  email: "Khailee1412@gmail.com",
  introduction: "Xin chào mình là Khải lê nè",
  create_at: new Date(),
} as TUserInfo;

export const Profile = memo(() => {
  const [file, setFile] = useState<File>();

  const handleChange = (target: EventTarget & HTMLInputElement) => {
    const newFile = target && target.files ? target.files[0] : null;
    setFile(newFile);
  };

  const handleClick = () => {
    console.log(file);
  };

  return (
    <div className={styles["profile"]}>
      <Section title={"User info"} style={{ marginBottom: "8px" }}>
        <UserInfoForm formData={userInfoFormData} readOnly />
      </Section>
      <Section title={"Test"} style={{ marginTop: "8px" }}>
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target)
          }
        />
        <button onClick={handleClick}>Send</button>
      </Section>
      <Section title={"Group info"} style={{ marginTop: "8px" }}>
        <GroupTabs />
      </Section>
    </div>
  );
});
