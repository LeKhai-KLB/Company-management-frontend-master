import { BaseTable } from "../BaseTable";
import { TManageGroup } from "~/services/groupServices";
import { GroupActionButton } from "./GroupActionsButton";

export type TGroupTableProps = {
  groupData?: Array<TManageGroup> | undefined | null;
  loading?: boolean;
  refetch?: () => void;
};

export const GroupTable = ({
  groupData,
  loading,
  refetch,
}: TGroupTableProps) => {
  return (
    <div>
      <BaseTable<TManageGroup>
        data={groupData}
        activeField="isDefault"
        loading={loading}
        columns={[
          {
            title: "Group name",
            field: "group_name",
          },
          {
            title: "Role",
            field: "role",
          },
          {
            title: "Default",
            conditionField: "isDefault",
            conditionValue: "*",
            style: { textAlign: "center" },
          },
          {
            title: "",
            field: "id",
            style: { textAlign: "right" },
            Cell: ({ entry: { id, isDefault } }) => {
              return (
                <GroupActionButton
                  id={id}
                  refetch={refetch}
                  isDefault={isDefault}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
};
