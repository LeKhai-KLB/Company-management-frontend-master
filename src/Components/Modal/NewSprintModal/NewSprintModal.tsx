import { NewSprintForm } from "~/Components/Form/NewSprintForm";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { BaseModal } from "../BaseModal";

export const NewSprintModal = () => {
  const { modalStore } = useGlobalModal();
  return (
    <BaseModal
      title="NEW SPRINT"
      showConfirmButton={false}
      showCancelButton={false}>
      <NewSprintForm refetch={modalStore?.modalConfigProps?.onConfirm} />
    </BaseModal>
  );
};
