import { BaseTable } from "../BaseTable";
import { TManageUsers } from "~/services/groupServices";
import { PendingUsersActionsButton } from "./PendingUsersActionsButton";
import "./PendingUsersTable.scss";

export type TPendingUsersTableProps = {
  pendingUsersData: Array<TManageUsers>;
  loading?: boolean;
  refetch?: () => void;
};

export const PendingUsersTable = ({
  pendingUsersData,
  loading,
  refetch,
}: TPendingUsersTableProps) => {
  return (
    <div>
      <BaseTable<TManageUsers>
        className="pending-users-table"
        loading={loading}
        data={pendingUsersData}
        columns={[
          {
            title: "Name",
            field: "username",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "",
            field: "id",
            style: { textAlign: "right" },
            Cell: ({ entry: { id } }) => {
              return <PendingUsersActionsButton id={id} />;
            },
          },
        ]}
      />
    </div>
  );
};
