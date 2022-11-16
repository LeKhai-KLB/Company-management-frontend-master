import { BaseForm } from "../BaseForm";
import { TRegisterMutationInput } from "~/services/authServices";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~utils/validator.schema";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import { useRegisterMutation } from "~/services/authServices";
import { execWithCatch } from "~/utils/execWithCatch";
import styles from "./RegisterForm.module.scss";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";

const schema = yup.object().shape({
  email: VALIDATOR_SCHEMA.EMAIL,
  password: VALIDATOR_SCHEMA.PASSWORD,
  username: VALIDATOR_SCHEMA.USERNAME,
  confirm_password: VALIDATOR_SCHEMA.CONFIRM_PASSWORD,
});

type TRegisterForm = TRegisterMutationInput & { confirm_password: string };

export const RegisterForm = () => {
  const { active, handleChangeFormState, requiredProps } =
    useCustomForm<TRegisterForm>();
  const [register, { loading }] = useRegisterMutation();
  const { showModal } = useGlobalModal();

  const onSubmit = async (values: TRegisterForm) => {
    const { confirm_password, ...registerInput } = values;
    await execWithCatch(() => register(registerInput));
    showModal({
      modalType: GLOBAL_MODAL_TYPE.LOGIN_MODAL,
    });
  };

  const showLoginModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.LOGIN_MODAL,
    });
  };

  return (
    <BaseForm<TRegisterForm, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      options={{
        defaultValues: {
          email: "",
          username: "",
          password: "",
          confirm_password: "",
        },
      }}>
      {requiredProps && (
        <>
          <InputField
            fullWidth
            placeholder={"Please input your email..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Email",
              name: "email",
              ...requiredProps,
            })}
          />
          <InputField
            fullWidth
            placeholder={"Please input your user's name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Username",
              name: "username",
              ...requiredProps,
            })}
          />
          <InputField
            fullWidth
            type="password"
            placeholder={"Please input your password..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Password",
              name: "password",
              ...requiredProps,
            })}
          />
          <InputField
            fullWidth
            type="password"
            placeholder={"Please input your password..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Confirm password",
              name: "confirm_password",
              ...requiredProps,
            })}
          />
          <Button
            fullWidth
            type="submit"
            loading={loading}
            sx={{ marginTop: "24px" }}
            disabled={!active}
            sizeKey={["extra-small", "small"]}
            variantKey={"submit"}>
            register
          </Button>
          <p
            onClick={showLoginModal}
            className={styles["register-form__direction"]}>
            Have an account? Login
          </p>
        </>
      )}
    </BaseForm>
  );
};
