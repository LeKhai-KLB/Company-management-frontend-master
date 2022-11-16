import { NewGroupForm } from "~/Components/Form/NewGroupForm";
import { BaseModal } from "../BaseModal";

export const NewGroupModal = () => {
  return (
    <BaseModal
      title="NEW GROUP"
      showConfirmButton={false}
      showCancelButton={false}>
      <NewGroupForm />
    </BaseModal>
  );
};
