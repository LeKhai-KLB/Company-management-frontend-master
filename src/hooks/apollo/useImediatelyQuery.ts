import type { DocumentNode } from "@apollo/client";
import { useQuery as useGqlQuery, QueryHookOptions } from "@apollo/client";
import type { TStateInfoExtension } from "./apollo.types";

export const useImediatelyQuery = <TOutput>(
  doc: DocumentNode,
  info: {
    queryName: string;
    inputName?: string;
    props?: Record<string, any>;
  },
  fetchOptions?: QueryHookOptions,
): TStateInfoExtension<TOutput> => {
  const { queryName, inputName, props } = info;
  const variables = props
    ? { variables: inputName ? { [inputName]: props } : props }
    : undefined;
  const queryOptions = Object.assign(
    {
      variables: variables,
      errorPolicy: "all",
    },
    fetchOptions,
  );
  const { loading, error, data, refetch, networkStatus } = useGqlQuery(
    doc,
    queryOptions,
  );

  return {
    loading,
    error,
    data: data?.[queryName],
    refetch,
    networkStatus,
    queryName,
  };
};
