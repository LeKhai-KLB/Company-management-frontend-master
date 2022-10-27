import { BaseModal, TBaseModalProps } from "../BaseModal";
import { RegisterForm } from "~/Components/Form";

export const RegisterModal = (props: TBaseModalProps) => {
  return (
    <BaseModal
      title="REGISTER"
      showCancelButton={false}
      showConfirmButton={false}
      {...props}>
      <RegisterForm />
    </BaseModal>
  );
};
