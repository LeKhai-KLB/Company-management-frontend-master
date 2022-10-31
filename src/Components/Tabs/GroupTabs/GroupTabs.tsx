import { TabController } from "../Elements/TabController";
import { TabPanel } from "../Elements/TabPanel";

const groupTabsList = [
  {
    label: "My current group",
    value: 1,
  },
  {
    label: "Manage Groups",
    value: 2,
  },
  {
    label: "New group",
    value: 3,
  },
];

export const GroupTabs = () => {
  return (
    <TabController
      style={{ marginTop: "16px" }}
      name={"group-tabs"}
      tabList={groupTabsList}
      currentValue={1}>
      <TabPanel value={1}>My current group</TabPanel>
      <TabPanel value={2}>Manage group</TabPanel>
      <TabPanel value={3}>New group</TabPanel>
    </TabController>
  );
};
