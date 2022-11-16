import { TabController } from "../Elements/TabController/TabController";
import { TabPanel } from "../Elements/TabPanel";
import { MyProjectTab } from "./Tab/MyProjectTab";
import { ManageProjectTab } from "./Tab/ManageProjectTab";

const tabList = [
  { label: "My project", value: 0 },
  { label: "Manage project", value: 1 },
];

export const ProjectTabs = () => {
  return (
    <TabController tabList={tabList} currentValue={1} name="groupTabs">
      <TabPanel value={0}>
        <MyProjectTab />
      </TabPanel>
      <TabPanel value={1}>
        <ManageProjectTab />
      </TabPanel>
    </TabController>
  );
};
