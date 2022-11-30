import { BaseForm } from "../BaseForm";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import { TextareaField } from "~/Components/Elements/Field";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~/utils/validator.schema";
import { execWithCatch } from "~/utils/execWithCatch";
import { useEffect } from "react";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { useDispatch } from "react-redux";
import {
  TCreateNewProject,
  useCreateNewProjectMutation,
} from "~/services/projectServices";
import { set_project_info } from "~/store/slices/projectSlice";

const schema = yup.object().shape({
  project_name: VALIDATOR_SCHEMA.PROJECTNAME,
  summary: VALIDATOR_SCHEMA.SUMMARY,
});

export type TNewProjectForm = {
  refetch?: () => void;
};

export const NewProjectForm = ({ refetch }: TNewProjectForm) => {
  const { active, handleChangeFormState, requiredProps } =
    useCustomForm<TCreateNewProject>();
  const [createNewProject, { loading, data }] = useCreateNewProjectMutation();
  const { hideModal } = useGlobalModal();
  const dispatch = useDispatch();

  const onSubmit = async (summitedData: TCreateNewProject) => {
    await execWithCatch(() => createNewProject(summitedData));
    refetch && (await refetch());
  };

  useEffect(
    () => {
      if (data) {
        dispatch(set_project_info(data));
        hideModal();
      }
    },
    // eslint-disable-next-line
    [data],
  );

  return (
    <BaseForm<TCreateNewProject, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      options={{
        defaultValues: {
          project_name: "",
          summary: "",
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
              name: "project_name",
              ...requiredProps,
            })}
          />
          <TextareaField
            fullWidth
            placeholder={"Write some summary about your project..."}
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
            loading={loading}
            type="submit"
            sx={{ marginTop: "24px" }}
            disabled={!active}
            sizeKey={["extra-small", "small"]}
            variantKey={"submit"}>
            Create new project
          </Button>
        </>
      )}
    </BaseForm>
  );
};
