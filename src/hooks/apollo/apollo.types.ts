import type {
  ApolloError,
  NetworkStatus,
  ApolloQueryResult,
  FetchResult,
} from "@apollo/client";

export type TFetchData<TInput> = (props?: TInput) => Promise<
  FetchResult<any, Record<string, any>, Record<string, any>> & {
    data?: Record<string, any>;
    error?: Record<string, any>;
  }
>;

export type TStateInfo<TOutput> = {
  loading: boolean;
  error: ApolloError | undefined;
  data: TOutput | undefined | null;
  queryName: string;
  mutationName: string;
};

export type TApolloLazyQueryHook<TInput, TOutput> = [
  TFetchData<TInput>,
  Omit<TStateInfo<TOutput>, "mutationName">,
];

export type TApolloMutationHook<TInput, TOutput> = [
  TFetchData<TInput>,
  Omit<TStateInfo<TOutput>, "queryName">,
];

type TQueryExtend = {
  refetch: (
    variables?:
      | Partial<{
          variables: Record<string, any>;
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<any>>;
  networkStatus: NetworkStatus;
};

export type TStateInfoExtension<TOutput> = Omit<
  TStateInfo<TOutput>,
  "mutationName"
> &
  TQueryExtend;
