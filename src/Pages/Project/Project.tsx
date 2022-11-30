import { memo } from "react";
import "./Project.scss";
import { BaseSection } from "~/Components/Section/BaseSection";
import { Button } from "~/Components/Elements/Button";
import { ProjectTable } from "~/Components/Elements/Table";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";
import { useGetProjectListQuery } from "~/services/projectServices";

export const Project = memo(() => {
  const { showModal } = useGlobalModal();
  const { loading, data, refetch } = useGetProjectListQuery();

  const handleShowModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.NEW_PROJECT_MODAL,
      modalConfigProps: { onConfirm: () => refetch() },
    });
  };

  return (
    <div className={"project-container"}>
      <BaseSection title={"Project"} style={{ marginBottom: "8px" }}>
        <div className={"project"}>
          <div className={"project__tool-bar"}>
            <div className={"project__tool-bar-left"}></div>
            <div className={"project__tool-bar-right"}>
              <Button
                sizeKey={["extra-small", "small"]}
                className={"project__button"}
                onClick={handleShowModal}
                variantKey={"submit"}>
                Create project
              </Button>
            </div>
          </div>
          <ProjectTable
            loading={loading}
            projectData={data}
            refetch={refetch}
          />
        </div>
      </BaseSection>
    </div>
  );
});
