import { useLazyQuery as useGqlLazyQuery } from "@apollo/client";
import type { DocumentNode, LazyQueryHookOptions } from "@apollo/client";
import { TApolloLazyQueryHook } from "./apollo.types";

export const useLazyQuery = <TInput, TOutput>(
  doc: DocumentNode,
  info: {
    queryName: string;
    inputName?: string;
  },
  fetchOptions?: LazyQueryHookOptions,
): TApolloLazyQueryHook<TInput, TOutput> => {
  const { queryName, inputName } = info;
  const lazyQueryOptions = Object.assign({ errorPolicy: "all" }, fetchOptions);
  const [fetchData, { loading, error, data }] = useGqlLazyQuery(
    doc,
    lazyQueryOptions,
  );
  return [
    (props?: TInput) => {
      const variables = props
        ? { variables: inputName ? { [inputName]: props } : props }
        : undefined;
      return fetchData(variables);
    },
    { loading, error, data: data?.[queryName], queryName },
  ];
};
