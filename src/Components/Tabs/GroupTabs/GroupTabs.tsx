import { TabController } from "../Elements/TabController/TabController";
import { TabPanel } from "../Elements/TabPanel";
import { MyGroupTab } from "./Tab/MyGroupTab";
import { ManageGroupTab } from "./Tab/ManageGroupTab";

const tabList = [
  { label: "My group", value: 0 },
  { label: "Manage group", value: 1 },
];

export const GroupTabs = () => {
  return (
    <TabController tabList={tabList} currentValue={1} name="groupTabs">
      <TabPanel value={0}>
        <MyGroupTab />
      </TabPanel>
      <TabPanel value={1}>
        <ManageGroupTab />
      </TabPanel>
    </TabController>
  );
};
