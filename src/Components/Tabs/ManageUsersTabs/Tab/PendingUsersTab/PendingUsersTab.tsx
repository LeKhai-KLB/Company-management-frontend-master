import { GROUP_ROLE } from "~constants/constants.app";
import { PendingUsersTable } from "~Components/Elements/Table/PendingUsersTable";
import { useGetMembersInGroupQuery } from "~/services/groupServices/groupService";

export const PendingUsersTab = () => {
  const { loading, data, refetch } = useGetMembersInGroupQuery([
    GROUP_ROLE.PENDING,
  ]);
  return (
    <PendingUsersTable
      pendingUsersData={data}
      loading={loading}
      refetch={() => refetch()}
    />
  );
};
