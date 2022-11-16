import { memo } from "react";
import "./Project.scss";
import { BaseSection } from "~/Components/Section/BaseSection";
import { ProjectTabs } from "../../Components/Tabs/ProjectTabs/ProjectTabs";

export const Project = memo(() => {
  return (
    <div className={"project"}>
      <BaseSection title={"Project"} style={{ marginBottom: "8px" }}>
        <ProjectTabs></ProjectTabs>
      </BaseSection>
    </div>
  );
});
