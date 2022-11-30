import { TabController } from "../Elements/TabController";
import { TabPanel } from "../Elements/TabPanel";
import { AddUserTab } from "./Tab/AddUserTab";
import { ManageUsersTab } from "./Tab/ManageUsersTab/ManageUsersTab";
import { PendingUsersTab } from "./Tab/PendingUsersTab";

const tabList = [
  { label: "Manage users", value: 0 },
  { label: "Pending list", value: 1 },
  { label: "Add user", value: 2 },
];

export const ManageUsersTabs = () => {
  return (
    <TabController tabList={tabList} currentValue={0} name="manageUsersTabs">
      <TabPanel value={0}>
        <ManageUsersTab />
      </TabPanel>
      <TabPanel value={1}>
        <PendingUsersTab />
      </TabPanel>
      <TabPanel value={2}>
        <AddUserTab />
      </TabPanel>
    </TabController>
  );
};
