import { ManageUsersTabs } from "~/Components/Tabs/ManageUsersTabs";
import { BaseModal } from "../BaseModal";

export const ManageUsersModal = () => {
  return (
    <BaseModal
      title="MANAGE USERS"
      showConfirmButton={false}
      showCancelButton={false}>
      <ManageUsersTabs />
    </BaseModal>
  );
};
