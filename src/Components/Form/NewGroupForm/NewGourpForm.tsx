import { BaseForm } from "../BaseForm";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import { TNewGroup } from "~services/groupServices/groupService.types";
import { TextareaField } from "~/Components/Elements/Field";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~/utils/validator.schema";

const schema = yup.object().shape({
  group_name: VALIDATOR_SCHEMA.GROUPNAME,
  summary: VALIDATOR_SCHEMA.SUMMARY,
});

export const NewGroupForm = () => {
  const { active, handleChangeFormState, requiredProps } =
    useCustomForm<TNewGroup>();

  const onSubmit = () => {
    console.log(schema);
  };

  return (
    <BaseForm<TNewGroup, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      options={{
        defaultValues: {
          group_name: "",
          summary: "",
        },
      }}>
      {requiredProps && (
        <>
          <InputField
            fullWidth
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
            placeholder={"Write some summary about your group..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Summary",
              name: "summary",
              ...requiredProps,
              required: false,
            })}
          />
          <Button
            fullWidth
            type="submit"
            sx={{ marginTop: "24px" }}
            disabled={!active}
            sizeKey={["extra-small", "small"]}
            variantKey={"submit"}>
            Create new group
          </Button>
        </>
      )}
    </BaseForm>
  );
};
