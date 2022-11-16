import { SearchBar } from "~/Components/SearchBar";
import "./ManageProjectTab.scss";
import { ProjectTable } from "../../../../Elements/Table/ProjectTable/ProjectTable";
import { TManageProject } from "~/services/projectServices";

const projectData: Array<TManageProject> = [
  {
    id: "1234abc",
    project_name: "New project 1",
  },
  {
    id: "1234abc12345ddfg",
    project_name: "New project 2",
    isDefaultProject: true,
  },
];

export const ManageProjectTab = () => {
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className={"manage-group-tab"}>
      <div className={"manage-group-tab__tool-bar"}>
        <SearchBar placeholder="Project name, id..." onChange={handleChange} />
      </div>
      <ProjectTable projectData={projectData} />
    </div>
  );
};
