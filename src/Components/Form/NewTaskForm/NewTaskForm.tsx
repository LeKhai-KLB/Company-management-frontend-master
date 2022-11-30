import { BaseForm } from "../BaseForm";
import { useCustomForm, requiredFormProps } from "~/hooks/form";
import { InputField } from "~/Components/Elements/Field/InputField";
import { Button } from "~/Components/Elements/Button";
import * as yup from "yup";
import { VALIDATOR_SCHEMA } from "~/utils/validator.schema";
import { execWithCatch } from "~/utils/execWithCatch";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { TCreateNewTask } from "~services/taskService/taskService.types";
import { TextareaField } from "../../Elements/Field/TextareaField/TextareaField";
import { useGetMembersInGroupQuery } from "~services/groupServices/groupService";
import { GROUP_ROLE } from "~/constants/constants.app";
import { SelectField } from "~/Components/Elements/Field/SelectField";
import { useState } from "react";
import "./NewTaskForm.scss";
import { useCreateNewTaskMutation } from "~/services/taskService/taskService";

const schema = yup.object().shape({
  task_name: VALIDATOR_SCHEMA.TASKNAME,
  content: VALIDATOR_SCHEMA.CONTENT,
  point: VALIDATOR_SCHEMA.POINT,
});

export type TNewTaskFormProps = {
  refetch?: () => void;
  sprint_id?: number;
};

export const NewTaskForm = ({ refetch, sprint_id }: TNewTaskFormProps) => {
  const { active, handleChangeFormState, requiredProps } =
    useCustomForm<Omit<TCreateNewTask, "task_members">>();
  const { hideModal } = useGlobalModal();
  const [members, setMembers] = useState<Array<number>>([]);
  const [createNewTask, { loading }] = useCreateNewTaskMutation();
  const { data } = useGetMembersInGroupQuery([
    GROUP_ROLE.ADMIN,
    GROUP_ROLE.MEMBER,
  ]);

  const memberList = data
    ? data.map(({ id, username }) => ({ label: username, value: id }))
    : [];

  const onSubmit = async (
    summitedData: Omit<TCreateNewTask, "task_members">,
  ) => {
    if (!sprint_id) return;
    await execWithCatch(() =>
      createNewTask({
        ...summitedData,
        task_members: members,
        point: Number(summitedData.point),
        sprint_id: sprint_id,
      }),
    );
    refetch && (await refetch());
    hideModal();
  };

  const onChangeSeleted = (id: number) => {
    if (members.includes(id)) {
      setMembers(members.filter((m) => m !== id));
      return;
    }
    setMembers([...members, id]);
  };

  return (
    <BaseForm<Omit<TCreateNewTask, "task_members">, typeof schema>
      onSubmit={onSubmit}
      handleChangeFormState={() => handleChangeFormState}
      schema={schema}
      options={{
        defaultValues: {
          task_name: "",
          content: "",
          point: 0,
        },
      }}>
      {requiredProps && (
        <>
          <InputField
            fullWidth
            placeholder={"Please input your task name..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Task name",
              name: "task_name",
              ...requiredProps,
            })}
          />
          <TextareaField
            fullWidth
            placeholder={"Please input your content..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Content",
              name: "content",
              required: false,
              ...requiredProps,
            })}
          />
          <InputField
            fullWidth
            placeholder={"Please input your point..."}
            sizeKey={["extra-small", "small"]}
            {...requiredFormProps({
              label: "Point",
              name: "point",
              required: false,
              ...requiredProps,
            })}
          />
          <SelectField<number>
            label={"Members"}
            data={memberList}
            fullWidth
            onChangeSelected={onChangeSeleted}
          />
          <div className={"members-container"}>
            {data &&
              members.length !== 0 &&
              members.map((m, index) => {
                const member = data.find(({ id }) => id === m);
                return (
                  <div key={index} className={"member-tag"}>
                    {member.username}
                  </div>
                );
              })}
          </div>
          <Button
            fullWidth
            loading={loading}
            type="submit"
            sx={{ marginTop: "24px" }}
            disabled={!active}
            sizeKey={["extra-small", "small"]}
            variantKey={"submit"}>
            Add new task
          </Button>
        </>
      )}
    </BaseForm>
  );
};
