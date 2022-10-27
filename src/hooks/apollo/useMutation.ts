import type { DocumentNode } from "@apollo/client";
import {
  useMutation as useGqlMutation,
  MutationHookOptions,
} from "@apollo/client";
import { TApolloMutationHook } from "./apollo.types";

export const useMutation = <TInput, TOutput>(
  doc: DocumentNode,
  info: {
    mutationName: string;
    inputName?: string;
  },
  fetchOptions?: MutationHookOptions,
): TApolloMutationHook<TInput, TOutput> => {
  const { mutationName, inputName } = info;
  const mutationOptions = Object.assign(
    {
      errorPolicy: "all",
    },
    fetchOptions,
  );
  const [fetchData, { loading, error, data }] = useGqlMutation(
    doc,
    mutationOptions,
  );

  return [
    (props?: TInput) => {
      const variables = props
        ? { variables: inputName ? { [inputName]: props } : props }
        : undefined;
      return fetchData(variables);
    },
    {
      loading,
      error,
      data: data?.[mutationName],
      mutationName,
    },
  ];
};
