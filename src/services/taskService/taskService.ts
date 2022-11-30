import { gql } from "@apollo/client";
import { useImediatelyQuery, useMutation } from "~/hooks/apollo";
import { TCreateNewTask, TTaskInfo } from "./taskService.types";

export const useCreateNewTaskMutation = () => {
  const CREATE_NEW_PROJECT_MUTATION = gql`
    mutation createNewTask($createNewTaskInput: CreateNewTaskInput!) {
      createNewTask(createNewTaskInput: $createNewTaskInput) {
        id
        task_name
        content
        point
        task_members {
          id
          username
        }
      }
    }
  `;
  return useMutation<TCreateNewTask, TTaskInfo>(
    CREATE_NEW_PROJECT_MUTATION,
    {
      mutationName: "createNewTask",
      inputName: "createNewTaskInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useGetTaskListQuery = (sprint_id: number) => {
  const GET_PROJECT_LIST_QUERY = gql`
    query getAllTask($getAllTaskInput: GetAllTaskInput!) {
      getAllTask(getAllTaskInput: $getAllTaskInput) {
        id
        task_name
        content
        point
        tag
        task_members {
          id
          username
        }
      }
    }
  `;
  return useImediatelyQuery<Array<TTaskInfo>>(
    GET_PROJECT_LIST_QUERY,
    {
      queryName: "getAllTask",
      inputName: "getAllTaskInput",
      props: { sprint_id },
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useSetTagMutation = () => {
  const CREATE_NEW_PROJECT_MUTATION = gql`
    mutation setTag($setTagInput: SetTagInput!) {
      setTag(setTagInput: $setTagInput)
    }
  `;
  return useMutation<{ task_id: number; tag: string }, boolean>(
    CREATE_NEW_PROJECT_MUTATION,
    {
      mutationName: "setTag",
      inputName: "setTagInput",
    },
    { fetchPolicy: "no-cache" },
  );
};
