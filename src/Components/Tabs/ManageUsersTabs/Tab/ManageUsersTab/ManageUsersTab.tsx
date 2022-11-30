import { ManageUsersTable } from "~/Components/Elements/Table";
import { useGetMembersInGroupQuery } from "~/services/groupServices/groupService";
import { GROUP_ROLE } from "~constants/constants.app";

export const ManageUsersTab = () => {
  const { loading, data, refetch } = useGetMembersInGroupQuery([
    GROUP_ROLE.ADMIN,
    GROUP_ROLE.MEMBER,
  ]);

  return (
    <ManageUsersTable
      manageUsersData={data}
      loading={loading}
      refetch={() => refetch()}
    />
  );
};
