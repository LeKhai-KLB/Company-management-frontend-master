import { BaseSection } from "../BaseSection";
import { GroupTabs } from "~/Components/Tabs/GroupTabs";

export const GroupSection = () => {
  return (
    <BaseSection title={"Group"}>
      <GroupTabs />
    </BaseSection>
  );
};
