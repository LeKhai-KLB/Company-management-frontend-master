import { BaseTable } from "../BaseTable";
import { ProjectActionButton } from "./ProjectActionsButton";
import { TManageProject } from "~services/projectServices";

export type TProjectTableProps = {
  projectData: Array<TManageProject>;
};

export const ProjectTable = ({ projectData }: TProjectTableProps) => {
  return (
    <div>
      <BaseTable<TManageProject>
        data={projectData}
        activeField="isDefaultProject"
        columns={[
          {
            title: "Project name",
            field: "project_name",
          },
          {
            title: "Default",
            conditionField: "isDefaultProject",
            conditionValue: "*",
            style: { textAlign: "center" },
          },
          {
            title: "",
            field: "id",
            style: { textAlign: "right" },
            Cell: ({ entry: { id } }) => {
              return <ProjectActionButton id={id} />;
            },
          },
        ]}
      />
    </div>
  );
};
