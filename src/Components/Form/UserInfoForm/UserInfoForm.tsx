import { BaseForm } from "../BaseForm";
import { TUserInfo } from "~/services/authServices/authServices.types";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~utils/validator.schema";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import styles from "./UserInfoForm.module.scss";
import { TFormDataProps } from "~/utils/mixins.type";
import { TextareaField, TextField } from "~/Components/Elements/Field";
import { useState } from "react";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { GLOBAL_MODAL_TYPE } from "~constants/constants.app";
import { UploadImage } from "~/Components/UploadImage";

const schema = yup.object().shape({
  email: VALIDATOR_SCHEMA.EMAIL,
  username: VALIDATOR_SCHEMA.USERNAME,
  introduction: VALIDATOR_SCHEMA.INTRODUCTION,
});

export type TUserInfoFormProps = TFormDataProps<TUserInfo> & {
  acceptEditMode?: boolean;
};

export const UserInfoForm = ({
  readOnly = false,
  acceptEditMode = true,
  formData,
}: TUserInfoFormProps) => {
  const { active, handleChangeFormState, setValue, requiredProps } =
    useCustomForm<TUserInfo>();
  const [isReadOnly, setIsReadOnly] = useState(readOnly);
  const [currentFormData, setCurrentFormData] = useState(formData);
  const { showModal, hideModal } = useGlobalModal();

  const onSubmit = async (values: TUserInfo) => {
    if (JSON.stringify(values) !== JSON.stringify(currentFormData)) {
      setCurrentFormData(values);
    }
    setIsReadOnly(!isReadOnly);
  };

  const handleChangeMode = () => {
    if (!isReadOnly) {
      Object.entries(currentFormData).forEach(([name, value]) => {
        setValue(name, value);
      });
    }
    setIsReadOnly(!isReadOnly);
  };

  const handleShowDeleteModal = () => {
    showModal({
      modalType: GLOBAL_MODAL_TYPE.BASE_MODAL,
      modalConfigProps: {
        variantKey: "confirm",
        children: "Confirm delete your account?",
        title: "WARNING!",
        onConfirm: () => {
          console.log("account deleted.");
          hideModal();
        },
      },
    });
  };

  return (
    <BaseForm<TUserInfo, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      className={styles["user-info-form"]}
      options={{
        defaultValues: {
          username: formData?.username || "",
          email: formData?.email || "",
          introduction: formData?.introduction || "",
        },
      }}>
      {(requiredProps || isReadOnly) && (
        <>
          <div className={styles["user-info-form__avatar-container"]}>
            <div className={styles["user-info-form__avatar-left-container"]}>
              {acceptEditMode && (
                <>
                  <Button
                    variantKey={
                      isReadOnly ? "toggle-to-active" : "toggle-to-cancel"
                    }
                    sizeKey={["extra-small", "small"]}
                    onClick={handleChangeMode}>
                    <i className={"icon-edit"} />
                  </Button>
                  <Button
                    variantKey={"text"}
                    className={styles["delete-button"]}
                    sizeKey={["extra-small", "small"]}
                    onClick={handleShowDeleteModal}>
                    <i className={"icon-bin2"} />
                  </Button>
                </>
              )}
            </div>
            <div className={styles["user-info-form__avatar-right-container"]}>
              <div className={styles["user-info-form__avatar"]}>
                <UploadImage
                  src="https://a.storyblok.com/f/67418/1760x1166/d11e738a9a/screenshot-2022-06-17-at-17-50-16.png"
                  style={{ borderRadius: "50%" }}
                  readOnly={isReadOnly}
                />
              </div>
            </div>
          </div>
          {formData?.create_at && (
            <TextField
              label={"Join at"}
              sizeKey={["extra-small", "small"]}
              value={formData?.create_at.toDateString()}
              style={{
                marginBottom: "18px",
              }}
            />
          )}
          <InputField
            fullWidth
            readOnly={isReadOnly}
            variantKey={"app"}
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
            readOnly={isReadOnly}
            variantKey={"app"}
            placeholder={"Please input your email..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Email",
              name: "email",
              ...requiredProps,
            })}
          />
          <TextareaField
            fullWidth
            readOnly={isReadOnly}
            variantKey={"app"}
            placeholder={"Please input your introduction..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Introduction",
              name: "introduction",
              ...requiredProps,
              required: false,
            })}
          />
          {!isReadOnly && (
            <Button
              fullWidth
              type="submit"
              sx={{ marginTop: "24px" }}
              disabled={!active}
              sizeKey={["extra-small", "small"]}
              variantKey={"submit"}>
              save
            </Button>
          )}
        </>
      )}
    </BaseForm>
  );
};
