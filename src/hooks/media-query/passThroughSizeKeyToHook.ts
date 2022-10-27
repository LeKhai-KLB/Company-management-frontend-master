import {
  TMediaQueryCollection,
  TSizeKey,
  TSizeKeyWithBreakpoint,
} from "~hooks/media-query";

export function passThroughSizeKeyToHook(sizeKey: TSizeKeyWithBreakpoint) {
  return sizeKey === "auto-responsive"
    ? ([
        "extra-small",
        "small",
        "medium",
        "large",
        "extra-large",
      ] as TMediaQueryCollection<TSizeKey>)
    : sizeKey;
}
