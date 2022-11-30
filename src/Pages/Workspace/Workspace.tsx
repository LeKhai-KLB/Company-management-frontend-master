import { memo, useEffect, useState } from "react";
import "./Workspace.scss";
import { BaseSection } from "~/Components/Section/BaseSection";
import { Button } from "~/Components/Elements/Button";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";
import {
  useGetSprintListQuery,
  useGetSprintMutation,
} from "~/services/projectServices";
import { SelectField } from "~/Components/Elements/Field/SelectField";
import { SprintInfoForm } from "~/Components/Form/SprintInfoForm";
import { execWithCatch } from "~/utils/execWithCatch";
import { ActionList } from "~/Components/ActionList";

export const Workspace = memo(() => {
  const { showModal } = useGlobalModal();
  const { data, refetch } = useGetSprintListQuery();
  const [currentSprint, setCurrentSprint] = useState(
    data && data.length ? data[0] : undefined,
  );
  const [getSprint] = useGetSprintMutation();

  const sprintList = data
    ? data.map(({ id, sprint_name }) => ({ label: sprint_name, value: id }))
    : [];

  const handleShowModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.NEW_SPRINT_MODAL,
      modalConfigProps: { onConfirm: () => refetch() },
    });
  };

  useEffect(
    () => {
      if (data && JSON.stringify(data) !== JSON.stringify(currentSprint)) {
        setCurrentSprint(data[0]);
      }
    },
    // eslint-disable-next-line
    [data],
  );

  const handleChangeSprint = async (val: number) => {
    if (val === currentSprint.id) return;
    const result = await execWithCatch(() =>
      getSprint({ sprint_id: Number(val) }),
    );
    if (result?.getSprintById) {
      setCurrentSprint(result?.getSprintById);
    }
  };

  return (
    <div className={"workspace-container"}>
      <BaseSection title={"Workspace"} style={{ marginBottom: "8px" }}>
        <div className="workspace__top-container">
          <Button
            sizeKey={["extra-small", "small"]}
            className={"workspace__button"}
            onClick={handleShowModal}
            variantKey={"submit"}>
            Add sprint
          </Button>
          <SelectField<number>
            className={"workspace__select-field"}
            label="Sprint:"
            data={sprintList}
            onChangeSelected={handleChangeSprint}
            fullWidth
            variantKey="app"
            sizeKey={["extra-small", "small"]}
          />
          <SprintInfoForm data={currentSprint} />
        </div>
        <div className="workspace__bottom-container">
          {currentSprint && (
            <ActionList
              sprint_id={
                currentSprint?.id ? Number(currentSprint?.id) : undefined
              }></ActionList>
          )}
        </div>
      </BaseSection>
    </div>
  );
});
