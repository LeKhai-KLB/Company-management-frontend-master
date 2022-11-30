import { gql } from "@apollo/client";
import { useMutation, useLazyQuery, useImediatelyQuery } from "~hooks/apollo";
import {
  TRegisterMutationInput,
  TLoginQueryInput,
  TUserInfo,
} from "./authServices.types";
import {} from "../../hooks/apollo/useLazyQuery";

export const useRegisterMutation = () => {
  const REGISTER_MUTATION = gql`
    mutation register($registerInput: RegisterInput!) {
      register(registerInput: $registerInput)
    }
  `;
  return useMutation<TRegisterMutationInput, boolean>(
    REGISTER_MUTATION,
    {
      mutationName: "register",
      inputName: "registerInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useLoginQuery = () => {
  const LOGIN_QUERY = gql`
    query login($loginInput: LoginInput!) {
      login(loginInput: $loginInput) {
        id
        username
        email
        avatar
        create_at
      }
    }
  `;
  return useLazyQuery<TLoginQueryInput, TUserInfo>(
    LOGIN_QUERY,
    {
      queryName: "login",
      inputName: "loginInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useCheckCurrentSessionQuery = () => {
  const CHECK_CURRENT_SESSION_QUERY = gql`
    query checkCurrentSession {
      checkCurrentSession {
        id
        username
        email
        avatar
        create_at
      }
    }
  `;
  return useImediatelyQuery<TUserInfo>(CHECK_CURRENT_SESSION_QUERY, {
    queryName: "checkCurrentSession",
  });
};

export const useLogoutQuery = () => {
  const LOGOUT_QUERY = gql`
    query logout {
      logout
    }
  `;
  return useLazyQuery<undefined, Boolean>(
    LOGOUT_QUERY,
    {
      queryName: "logout",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useSkipSessionQuery = () => {
  const SKIP_SESSION_QUERY = gql`
    query skipSession {
      skipSession
    }
  `;
  return useLazyQuery<undefined, boolean>(SKIP_SESSION_QUERY, {
    queryName: "skipSession",
  });
};

export const useUpdateUserInfoMutation = () => {
  const UPDATE_USER_INFO_MUTATION = gql`
    mutation updateUserInfo($updateUserInput: UpdateUserInput!) {
      updateUserInfo(updateUserInput: $updateUserInput) {
        username
        email
        avatar
        create_at
      }
    }
  `;
  return useMutation<TUserInfo, boolean>(
    UPDATE_USER_INFO_MUTATION,
    {
      mutationName: "updateUserInfo",
      inputName: "updateUserInput",
    },
    { fetchPolicy: "no-cache" },
  );
};

export const useDeleteUserMutation = () => {
  const DELETE_USER_MUTAION = gql`
    mutation deleteUser {
      deleteUser
    }
  `;
  return useMutation<undefined, boolean>(
    DELETE_USER_MUTAION,
    {
      mutationName: "deleteUser",
    },
    { fetchPolicy: "no-cache" },
  );
};
