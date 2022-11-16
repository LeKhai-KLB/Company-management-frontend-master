import { BaseForm } from "../BaseForm";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import { TGroupInfo } from "../../../services/groupServices/groupService.types";
import { TextareaField, TextField } from "~/Components/Elements/Field";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~/utils/validator.schema";
import { TFormDataProps } from "~/utils/mixins.type";

const schema = yup.object().shape({
  group_name: VALIDATOR_SCHEMA.GROUPNAME,
  summary: VALIDATOR_SCHEMA.SUMMARY,
});

export const GroupInfoForm = ({
  formData,
  readOnly = false,
}: TFormDataProps<TGroupInfo>) => {
  const { active, handleChangeFormState, requiredProps, isReadOnly } =
    useCustomForm<TGroupInfo>({
      initialData: formData,
      initialReadOnlyState: readOnly,
    });

  const onSubmit = () => {
    console.log("onSubmit");
  };

  return (
    <BaseForm<TGroupInfo, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      options={{
        defaultValues: {
          group_name: formData.group_name,
          summary: formData.summary,
        },
      }}>
      {requiredProps && (
        <>
          <TextField
            label={"Id"}
            sizeKey={["extra-small", "small"]}
            acceptedCopy
            value={formData?.id ? formData.id : "Unknown"}
            style={{
              marginBottom: "18px",
            }}
          />
          <TextField
            label={"Create at"}
            sizeKey={["extra-small", "small"]}
            value={
              formData?.create_at?.toDateString
                ? formData?.create_at?.toDateString()
                : "Unknown"
            }
            style={{
              marginBottom: "18px",
            }}
          />
          <InputField
            fullWidth
            readOnly={!isReadOnly}
            variantKey={"app"}
            placeholder={"Please input your group name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Group name",
              name: "group_name",
              ...requiredProps,
            })}
          />
          <TextareaField
            fullWidth
            readOnly={!isReadOnly}
            placeholder={"Write some summary about your group..."}
            sizeKey={["extra-small", "small"]}
            variantKey={"app"}
            {...requiredFormProps({
              label: "Summary",
              name: "summary",
              ...requiredProps,
              required: false,
            })}
          />
          {isReadOnly && (
            <Button
              fullWidth
              type="submit"
              sx={{ marginTop: "24px" }}
              disabled={!active}
              sizeKey={["extra-small", "small"]}
              variantKey={"submit"}>
              Update group info
            </Button>
          )}
        </>
      )}
    </BaseForm>
  );
};
