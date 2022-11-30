import { gql } from "@apollo/client";
import { useImediatelyQuery, useMutation } from "~/hooks/apollo";
import {
  TCreateNewProject,
  TCreateNewSprint,
  TProjectInfo,
  TSprintInfo,
} from "./projectService.types";

export const useCreateNewProjectMutation = () => {
  const CREATE_NEW_PROJECT_MUTATION = gql`
    mutation createNewProject($createNewProjectInput: CreateNewProjectInput!) {
      createNewProject(createNewProjectInput: $createNewProjectInput) {
        id
        project_name
        summary
        create_at
      }
    }
  `;
  return useMutation<TCreateNewProject, TProjectInfo>(
    CREATE_NEW_PROJECT_MUTATION,
    {
      mutationName: "createNewProject",
      inputName: "createNewProjectInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useGetProjectListQuery = () => {
  const GET_PROJECT_LIST_QUERY = gql`
    query getProjectList {
      getProjectList {
        id
        project_name
        create_at
        isDefault
      }
    }
  `;
  return useImediatelyQuery<Array<TProjectInfo>>(
    GET_PROJECT_LIST_QUERY,
    {
      queryName: "getProjectList",
    },
    { fetchPolicy: "cache-first", notifyOnNetworkStatusChange: true },
  );
};

export const useSetDefaultProjectMutation = () => {
  const SET_DEFAULT_PROJECT_MUTAION = gql`
    mutation setDefaultProject(
      $setDefaultProjectInput: SetDefaultProjectInput!
    ) {
      setDefaultProject(setDefaultProjectInput: $setDefaultProjectInput) {
        id
        project_name
        summary
        create_at
      }
    }
  `;
  return useMutation<{ project_id: string }, TProjectInfo>(
    SET_DEFAULT_PROJECT_MUTAION,
    {
      mutationName: "setDefaultProject",
      inputName: "setDefaultProjectInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useCreateNewSprintMutation = () => {
  const CREATE_NEW_PROJECT_MUTATION = gql`
    mutation createNewSprint($createNewSprintInput: CreateNewSprintInput!) {
      createNewSprint(createNewSprintInput: $createNewSprintInput) {
        id
        sprint_name
        start_date
        end_date
      }
    }
  `;
  return useMutation<TCreateNewSprint, TSprintInfo>(
    CREATE_NEW_PROJECT_MUTATION,
    {
      mutationName: "createNewSprint",
      inputName: "createNewSprintInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useGetSprintListQuery = () => {
  const GET_PROJECT_LIST_QUERY = gql`
    query getAllSprint {
      getAllSprint {
        id
        sprint_name
        start_date
        end_date
      }
    }
  `;
  return useImediatelyQuery<Array<TSprintInfo>>(
    GET_PROJECT_LIST_QUERY,
    {
      queryName: "getAllSprint",
    },
    { fetchPolicy: "cache-first", notifyOnNetworkStatusChange: true },
  );
};

export const useGetSprintMutation = () => {
  const CREATE_NEW_PROJECT_MUTATION = gql`
    mutation getSprintById($getSprintInput: GetSprintInput!) {
      getSprintById(getSprintInput: $getSprintInput) {
        id
        sprint_name
        start_date
        end_date
      }
    }
  `;
  return useMutation<{ sprint_id: number }, TSprintInfo>(
    CREATE_NEW_PROJECT_MUTATION,
    {
      mutationName: "getSprintById",
      inputName: "getSprintInput",
    },
    { fetchPolicy: "no-cache" },
  );
};
