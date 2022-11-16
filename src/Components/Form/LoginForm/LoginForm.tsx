import { BaseForm } from "../BaseForm";
import { TLoginQueryInput } from "~/services/authServices";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~utils/validator.schema";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import { TFormDataProps } from "~utils/mixins.type";
import { useLoginQuery } from "~/services/authServices";
import { execWithCatch } from "~/utils/execWithCatch";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~/constants/constants.app";
import { set_user } from "~store/slices/authSlice";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  email: VALIDATOR_SCHEMA.EMAIL,
  password: VALIDATOR_SCHEMA.PASSWORD,
});

export const LoginForm = ({
  readOnly,
  formData,
}: TFormDataProps<TLoginQueryInput>) => {
  const { active, handleChangeFormState, requiredProps } =
    useCustomForm<TLoginQueryInput>();
  const [login, { loading }] = useLoginQuery();
  const { showModal, hideModal } = useGlobalModal();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values: TLoginQueryInput) => {
    const data = await execWithCatch(() => login(values));
    if (data) {
      dispatch(set_user(data?.login));

      setTimeout(() => {
        hideModal();
        nav("./app");
      }, 300);
    }
  };

  const showRegisterModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.REGISTER_MODAL,
    });
  };

  return (
    <BaseForm<TLoginQueryInput, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      options={{
        defaultValues: {
          email: formData?.email || "",
          password: formData?.password || "",
        },
      }}>
      {(requiredProps || readOnly) && (
        <>
          <InputField
            fullWidth
            readOnly={readOnly}
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
            readOnly={readOnly}
            type="password"
            placeholder={"Please input your password..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Password",
              name: "password",
              ...requiredProps,
            })}
          />
          {!readOnly && (
            <Button
              fullWidth
              type="submit"
              sx={{ marginTop: "24px" }}
              loading={loading}
              disabled={!active}
              sizeKey={["extra-small", "small"]}
              variantKey={"submit"}>
              login
            </Button>
          )}
          <p
            onClick={showRegisterModal}
            className={styles["login-form__direction"]}>
            Don't have account? Register
          </p>
        </>
      )}
    </BaseForm>
  );
};
