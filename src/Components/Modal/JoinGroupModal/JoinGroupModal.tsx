import { JoinGroupForm } from "~/Components/Form/JoinGroupForm";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { BaseModal } from "../BaseModal";

export const JoinGroupModal = () => {
  const { modalStore } = useGlobalModal();
  const currentContentProps =
    modalStore && modalStore?.modalContentProps
      ? modalStore.modalContentProps
      : {};
  return (
    <BaseModal
      title="JOIN NEW GROUP"
      showConfirmButton={false}
      showCancelButton={false}>
      <JoinGroupForm {...currentContentProps} />
    </BaseModal>
  );
};
