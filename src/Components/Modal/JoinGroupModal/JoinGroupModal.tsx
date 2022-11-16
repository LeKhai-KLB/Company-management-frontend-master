import { JoinGroupForm } from "~/Components/Form/JoinGroupForm";
import { BaseModal } from "../BaseModal";

export const JoinGroupModal = () => {
  return (
    <BaseModal
      title="JOIN NEW GROUP"
      showConfirmButton={false}
      showCancelButton={false}>
      <JoinGroupForm />
    </BaseModal>
  );
};
