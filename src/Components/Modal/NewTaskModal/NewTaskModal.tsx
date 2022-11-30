import { NewTaskForm } from "~/Components/Form/NewTaskForm";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { BaseModal } from "../BaseModal";

export const NewTaskModal = () => {
  const { modalStore } = useGlobalModal();

  return (
    <BaseModal
      title="NEW TASK"
      showConfirmButton={false}
      showCancelButton={false}>
      <NewTaskForm
        refetch={modalStore?.modalConfigProps?.onConfirm}
        sprint_id={modalStore?.modalContentProps?.sprint_id}
      />
    </BaseModal>
  );
};
