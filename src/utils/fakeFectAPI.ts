export type TFakeFectApiPromise = Promise<{
  error: { message: "failed" } | null;
  data: any;
}>;

export function fakeFectApiPromise(
  seconds: number = 3000,
  result: any = true,
  isFetchFailed: boolean = false,
): TFakeFectApiPromise {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFetchFailed) reject({ error: { message: "failed" }, data: null });
      else resolve({ data: result, error: null });
    }, seconds);
  });
}
