import { BaseForm } from "../BaseForm";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import { TextareaField, TextField } from "~/Components/Elements/Field";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~/utils/validator.schema";
import { TFormDataProps } from "~/utils/mixins.type";
import { TProjectInfo } from "~services/projectServices";

const schema = yup.object().shape({
  project_name: VALIDATOR_SCHEMA.PROJECTNAME,
});

export const ProjectInfoForm = ({
  formData,
  readOnly = false,
}: TFormDataProps<TProjectInfo>) => {
  const { active, handleChangeFormState, requiredProps, isReadOnly } =
    useCustomForm<TProjectInfo>({
      initialData: formData,
      initialReadOnlyState: readOnly,
    });

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <BaseForm<TProjectInfo, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      options={{
        defaultValues: {
          project_name: formData.project_name,
        },
      }}>
      {requiredProps && (
        <>
          <TextField
            label={"Id"}
            sizeKey={["extra-small", "small"]}
            value={formData?.id ? formData.id : "Unknown"}
            style={{
              marginBottom: "18px",
            }}
          />
          <InputField
            fullWidth
            readOnly={isReadOnly}
            variantKey={"app"}
            placeholder={"Please input your group name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Project name",
              name: "project_name",
              ...requiredProps,
            })}
          />
        </>
      )}
    </BaseForm>
  );
};
