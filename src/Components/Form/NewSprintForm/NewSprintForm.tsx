import { BaseForm } from "../BaseForm";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~/utils/validator.schema";
import { execWithCatch } from "~/utils/execWithCatch";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { useCreateNewSprintMutation } from "~/services/projectServices";
import { TCreateNewSprint } from "~services/projectServices/projectService.types";

const schema = yup.object().shape({
  sprint_name: VALIDATOR_SCHEMA.SPRINTNAME,
  start_date: VALIDATOR_SCHEMA.DATETIME,
  end_date: VALIDATOR_SCHEMA.DATETIME,
});

export type TNewSprintFormProps = {
  refetch?: () => void;
};

export const NewSprintForm = ({ refetch }: TNewSprintFormProps) => {
  const { active, handleChangeFormState, requiredProps } =
    useCustomForm<TCreateNewSprint>();
  const [createNewSprint, { loading }] = useCreateNewSprintMutation();
  const { hideModal } = useGlobalModal();

  const onSubmit = async (summitedData: TCreateNewSprint) => {
    await execWithCatch(() => createNewSprint(summitedData));
    refetch && (await refetch());
    hideModal();
  };

  return (
    <BaseForm<TCreateNewSprint, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      options={{
        defaultValues: {
          sprint_name: "",
          start_date: new Date(),
          end_date: new Date(),
        },
      }}>
      {requiredProps && (
        <>
          <InputField
            fullWidth
            placeholder={"Please input your project name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Project name",
              name: "sprint_name",
              ...requiredProps,
            })}
          />
          <InputField
            fullWidth
            type="datetime-local"
            placeholder={"Please input your project name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Start date",
              name: "start_date",
              required: false,
              ...requiredProps,
            })}
          />
          <InputField
            fullWidth
            type="datetime-local"
            placeholder={"Please input your project name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "End date",
              name: "end_date",
              required: false,
              ...requiredProps,
            })}
          />
          <Button
            fullWidth
            loading={loading}
            type="submit"
            sx={{ marginTop: "24px" }}
            disabled={!active}
            sizeKey={["extra-small", "small"]}
            variantKey={"submit"}>
            Add new sprint
          </Button>
        </>
      )}
    </BaseForm>
  );
};
