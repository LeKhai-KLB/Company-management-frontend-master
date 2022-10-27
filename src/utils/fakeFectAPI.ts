export function fakeFectApiPromise(
  seconds: number = 3000,
  result: any = true,
  isFetchFailed: boolean = false,
): Promise<{
  error?: "failed" | undefined;
  data?: any;
}> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFetchFailed) reject({ error: "failed" });
      else resolve({ data: result });
    }, seconds);
  });
}
