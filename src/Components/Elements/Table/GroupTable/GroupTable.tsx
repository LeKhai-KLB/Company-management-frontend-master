import { BaseTable } from "../BaseTable";
import { TManageGroup } from "~/services/groupServices";
import { GroupActionButton } from "./GroupActionsButton";

export type TGroupTableProps = {
  groupData: Array<TManageGroup>;
};

export const GroupTable = ({ groupData }: TGroupTableProps) => {
  return (
    <div>
      <BaseTable<TManageGroup>
        data={groupData}
        activeField="isDefaultGroup"
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
            conditionField: "isDefaultGroup",
            conditionValue: "*",
            style: { textAlign: "center" },
          },
          {
            title: "",
            field: "id",
            style: { textAlign: "right" },
            Cell: ({ entry: { id } }) => {
              return <GroupActionButton id={id} />;
            },
          },
        ]}
      />
    </div>
  );
};
