import { BaseTable } from "../BaseTable";
import { ProjectActionButton } from "./ProjectActionsButton";
import { TProjectInfo } from "~services/projectServices";

export type TProjectTableProps = {
  projectData?: Array<TProjectInfo>;
  loading?: boolean;
  refetch?: () => void;
};

export const ProjectTable = ({
  projectData,
  loading,
  refetch,
}: TProjectTableProps) => {
  return (
    <div>
      <BaseTable<TProjectInfo>
        data={projectData}
        loading={loading}
        activeField="isDefault"
        columns={[
          {
            title: "Project name",
            field: "project_name",
          },
          {
            title: "Create at",
            field: "create_at",
          },
          {
            title: "State",
            conditionField: "isDefault",
            conditionValue: "Working on",
            style: { textAlign: "center" },
          },
          {
            title: "",
            field: "id",
            style: { textAlign: "right" },
            Cell: ({ entry: { id, isDefault } }) => {
              return (
                <ProjectActionButton
                  id={id}
                  isDefault={isDefault}
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
