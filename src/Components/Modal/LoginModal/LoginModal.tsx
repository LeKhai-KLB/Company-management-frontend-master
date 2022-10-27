import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { BaseModal, TBaseModalProps } from "../BaseModal";
import { LoginForm } from "~/Components/Form/LoginForm/LoginForm";

export const LoginModal = (props: TBaseModalProps) => {
  const { modalStore } = useGlobalModal();
  const currentContentProps =
    modalStore && modalStore?.modalContentProps
      ? modalStore.modalContentProps
      : {};
  return (
    modalStore && (
      <BaseModal
        title="LOGIN"
        showCancelButton={false}
        showConfirmButton={false}
        {...props}>
        <LoginForm {...currentContentProps} />
      </BaseModal>
    )
  );
};
