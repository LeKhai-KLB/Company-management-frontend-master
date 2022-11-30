import { FetchResult } from "@apollo/client";
import { toast } from "react-toastify";
import { TFakeFectApiPromise } from "./fakeFectAPI";

export type TExecWithCatchCallback = Promise<
  | (FetchResult<any, Record<string, any>, Record<string, any>> & {
      data?: Record<string, any>;
      error?: Record<string, any>;
    })
  | TFakeFectApiPromise
>;

export async function execWithCatch(
  callback: () => TExecWithCatchCallback,
  options?: {
    successMessage?: string;
    errorMessage?: string;
  },
) {
  try {
    const result = await callback();
    if (result.data && Object.values(result.data || {})[0]) {
      toast.success(options?.successMessage || "Successfully!");
      return result.data;
    } else {
      toast.error(result.error?.message || options?.errorMessage || "error");
      return null;
    }
  } catch (err: any) {
    toast.error(err?.message || "error");
  }
  return null;
}
