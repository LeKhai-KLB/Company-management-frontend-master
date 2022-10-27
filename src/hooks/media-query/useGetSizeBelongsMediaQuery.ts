import { TSizeKeyWithBreakpoint, TSizeKey } from "./media-query.types";
import { passThroughSizeKeyToHook } from "./passThroughSizeKeyToHook";
import { useGetItemBelongsMediaQuery } from "./useGetItemBelongsMediaQuery";

export function useGetSizeBelongsMediaQuery(
  sizeKey: TSizeKeyWithBreakpoint,
): [TSizeKey | undefined, (newSizeKey: TSizeKeyWithBreakpoint) => void] {
  const [currentSizeKey, setCurrentSizeKey] =
    useGetItemBelongsMediaQuery<TSizeKey>(passThroughSizeKeyToHook(sizeKey));
  return [
    currentSizeKey,
    (newSizeKey: TSizeKeyWithBreakpoint) =>
      setCurrentSizeKey(newSizeKey as TSizeKey),
  ];
}
