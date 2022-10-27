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
  return useLazyQuery<undefined, Boolean>(SKIP_SESSION_QUERY, {
    queryName: "skipSession",
  });
};

export const useTestAuthGuardQuery = () => {
  const GET_JWT_QUERY = gql`
    query testAuthGuard {
      testAuthGuard
    }
  `;
  return useLazyQuery<undefined, string>(GET_JWT_QUERY, {
    queryName: "testAuthGuard",
  });
};
