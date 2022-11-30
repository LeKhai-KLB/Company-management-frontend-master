import { gql } from "@apollo/client";
import { GROUP_ROLE } from "~/constants/constants.app";
import { useImediatelyQuery, useMutation } from "~/hooks/apollo";
import {
  TGroupInfo,
  TManageGroup,
  TManageUsers,
  TNewGroup,
  TSetRole,
  TUpdateGroupInfo,
} from "./groupService.types";

export const useGetDefaultGroupQuery = () => {
  const GET_DEFAULT_GROUP_QUERY = gql`
    query getDefaultGroup {
      getDefaultGroup {
        id
        group_name
        summary
        create_at
        role
      }
    }
  `;
  return useImediatelyQuery<TGroupInfo>(GET_DEFAULT_GROUP_QUERY, {
    queryName: "getDefaultGroup",
  });
};

export const useGetGroupListQuery = () => {
  const GET_GROUP_LIST_QUERY = gql`
    query getGroupList {
      getGroupList {
        id
        group_name
        role
        isDefault
      }
    }
  `;
  return useImediatelyQuery<Array<TManageGroup>>(
    GET_GROUP_LIST_QUERY,
    {
      queryName: "getGroupList",
    },
    { fetchPolicy: "cache-first", notifyOnNetworkStatusChange: true },
  );
};

export const useCreateNewGroupMutation = () => {
  const CREATE_NEW_GROUP_MUTATION = gql`
    mutation createNewGroup($createNewGroupInput: CreateNewGroupInput!) {
      createNewGroup(createNewGroupInput: $createNewGroupInput) {
        id
        group_name
        summary
        create_at
        role
      }
    }
  `;
  return useMutation<TNewGroup, TGroupInfo>(
    CREATE_NEW_GROUP_MUTATION,
    {
      mutationName: "createNewGroup",
      inputName: "createNewGroupInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useUpdateGroupInfoMutation = () => {
  const UPDATE_GROUP_INFO_MUTATION = gql`
    mutation updateGroupInfo($updateGroupInfoInput: UpdateGroupInfoInput!) {
      updateGroupInfo(updateGroupInfoInput: $updateGroupInfoInput) {
        id
        group_name
        summary
        create_at
        role
      }
    }
  `;
  return useMutation<TUpdateGroupInfo, TGroupInfo>(
    UPDATE_GROUP_INFO_MUTATION,
    {
      mutationName: "updateGroupInfo",
      inputName: "updateGroupInfoInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useDeleteGroupMutation = () => {
  const DELETE_GROUP_MUTAION = gql`
    mutation deleteGroup {
      deleteGroup
    }
  `;
  return useMutation<undefined, boolean>(
    DELETE_GROUP_MUTAION,
    {
      mutationName: "deleteGroup",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useSetDefaultGroupMutation = () => {
  const SET_DEFAULT_GROUP_MUTAION = gql`
    mutation setDefaultGroup($setDefaultGroupInput: SetDefaultGroupInput!) {
      setDefaultGroup(setDefaultGroupInput: $setDefaultGroupInput) {
        id
        group_name
        summary
        create_at
        role
      }
    }
  `;
  return useMutation<{ group_id: string }, TGroupInfo>(
    SET_DEFAULT_GROUP_MUTAION,
    {
      mutationName: "setDefaultGroup",
      inputName: "setDefaultGroupInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useJoinGroupMutation = () => {
  const JOIN_GROUP_MUTAION = gql`
    mutation joinGroup($joinGroupInput: JoinGroupInput!) {
      joinGroup(joinGroupInput: $joinGroupInput)
    }
  `;
  return useMutation<{ group_id: string }, Boolean>(
    JOIN_GROUP_MUTAION,
    {
      mutationName: "joinGroup",
      inputName: "joinGroupInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useLeaveGroupMutation = () => {
  const LEAVE_GROUP_MUTAION = gql`
    mutation leaveGroup($leaveGroupInput: LeaveGroupInput!) {
      leaveGroup(leaveGroupInput: $leaveGroupInput)
    }
  `;
  return useMutation<{ group_id: string }, Boolean>(
    LEAVE_GROUP_MUTAION,
    {
      mutationName: "leaveGroup",
      inputName: "leaveGroupInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useDismissUserMutation = () => {
  const DISMISS_USER_MUTAION = gql`
    mutation dismissUser($dismissUserInput: DismissUserInput!) {
      dismissUser(dismissUserInput: $dismissUserInput)
    }
  `;
  return useMutation<{ user_id: number }, Boolean>(
    DISMISS_USER_MUTAION,
    {
      mutationName: "dismissUser",
      inputName: "dismissUserInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useAddMemberViaEmailMutation = () => {
  const ADD_MEMBER_VIA_EMAIL_MUTAION = gql`
    mutation addGroupMemberViaEmail(
      $addGroupMemberViaEmailInput: AddGroupMemberViaEmailInput!
    ) {
      addGroupMemberViaEmail(
        addGroupMemberViaEmailInput: $addGroupMemberViaEmailInput
      )
    }
  `;
  return useMutation<{ email: string }, Boolean>(
    ADD_MEMBER_VIA_EMAIL_MUTAION,
    {
      mutationName: "addGroupMemberViaEmail",
      inputName: "addGroupMemberViaEmailInput",
    },
    { fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true },
  );
};

export const useSetRoleMutation = () => {
  const SET_ROLE_MUTAION = gql`
    mutation setRole($setRoleInput: SetRoleInput!) {
      setRole(setRoleInput: $setRoleInput)
    }
  `;
  return useMutation<TSetRole, Boolean>(
    SET_ROLE_MUTAION,
    {
      mutationName: "setRole",
      inputName: "setRoleInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useGetMembersInGroupQuery = (roles: GROUP_ROLE[]) => {
  const GET_MEMBERS_IN_GROUP_QUERY = gql`
    query getMembersInGroup($getMembersInGroupInput: GetMembersInGroupInput!) {
      getMembersInGroup(getMembersInGroupInput: $getMembersInGroupInput) {
        id
        username
        role
        email
      }
    }
  `;
  return useImediatelyQuery<Array<TManageUsers>>(
    GET_MEMBERS_IN_GROUP_QUERY,
    {
      queryName: "getMembersInGroup",
      inputName: "getMembersInGroupInput",
      props: { roles },
    },
    { fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true },
  );
};
