import { BaseTable } from "../BaseTable";
import { TManageUsers } from "~/services/groupServices";
import { ManageUsersActionsButton } from "./ManageUsersActionsButton";
import "./ManageUsersTable.scss";

export type TManageUsersTableProps = {
  manageUsersData: Array<TManageUsers>;
  loading?: boolean;
  refetch?: () => void;
};

export const ManageUsersTable = ({
  manageUsersData,
  loading,
  refetch,
}: TManageUsersTableProps) => {
  return (
    <div>
      <BaseTable<TManageUsers>
        className="manage-users-table"
        data={manageUsersData}
        loading={loading}
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
            title: "Role",
            field: "role",
          },
          {
            title: "",
            field: "id",
            style: { textAlign: "right" },
            Cell: ({ entry: { id, role } }) => {
              return (
                <ManageUsersActionsButton
                  id={id}
                  role={role}
                  refetch={refetch}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
};
