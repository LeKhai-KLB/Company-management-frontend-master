import { NewProjectForm } from "~/Components/Form";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { BaseModal } from "../BaseModal";

export const NewProjectModal = () => {
  const { modalStore } = useGlobalModal();
  return (
    <BaseModal
      title="NEW PROJECT"
      showConfirmButton={false}
      showCancelButton={false}>
      <NewProjectForm refetch={modalStore?.modalConfigProps?.onConfirm} />
    </BaseModal>
  );
};
