import { useState, useCallback, useLayoutEffect } from "react";
import type {
  TGetItemOptions,
  TItemCollection,
  TMediaQueryCollection,
} from "./media-query.types";
import _debounce from "lodash/debounce";
import { BREAKPOINTS } from "~constants/constants.app";
import { Dispatch } from "react";
import { SetStateAction } from "react";

function getExistItem<T>(
  index: number,
  list: TMediaQueryCollection<T>,
  autoGetOtherItem: boolean,
) {
  if (!autoGetOtherItem) {
    return list[index];
  }
  if (list[index] !== undefined) return list[index];
  let leftValue,
    rightValue,
    i = index,
    j = index;
  while (i >= 0 || j <= list.length - 1) {
    if (leftValue === undefined) leftValue = list[i];
    if (rightValue === undefined) rightValue = list[j];
    if (leftValue !== undefined || rightValue !== undefined) break;
    i !== -1 && i--;
    j !== list.length && j++;
  }
  return leftValue || rightValue;
}

function isMatchBreakPoint(
  breakpointKey: "xs" | "sm" | "md" | "lg" | "xl",
  windowWidth: number,
) {
  if (breakpointKey === "xl") {
    return windowWidth >= BREAKPOINTS[breakpointKey][0];
  }
  return (
    windowWidth >= BREAKPOINTS[breakpointKey][0] &&
    windowWidth <= BREAKPOINTS[breakpointKey][1]
  );
}

function getItemBelongsBreakPoint<T>(
  itemCollection: TMediaQueryCollection<T>,
  autoGetOtherItem: boolean,
): T | undefined {
  const windowWidth = window.innerWidth;
  switch (true) {
    case isMatchBreakPoint("xs", windowWidth):
      return getExistItem<T>(0, itemCollection, autoGetOtherItem);
    case isMatchBreakPoint("sm", windowWidth):
      return getExistItem<T>(1, itemCollection, autoGetOtherItem);
    case isMatchBreakPoint("md", windowWidth):
      return getExistItem<T>(2, itemCollection, autoGetOtherItem);
    case isMatchBreakPoint("lg", windowWidth):
      return getExistItem<T>(3, itemCollection, autoGetOtherItem);
    case isMatchBreakPoint("xl", windowWidth):
      return getExistItem<T>(4, itemCollection, autoGetOtherItem);
  }
}

export function useGetItemBelongsMediaQuery<T>(
  itemCollection: TItemCollection<T>,
  options: TGetItemOptions = {
    autoGetOtherItem: true,
  },
): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const { autoGetOtherItem } = options;
  const [currentItem, setCurrentItem] = useState<T | undefined>(() =>
    Array.isArray(itemCollection)
      ? getItemBelongsBreakPoint<T>(
          itemCollection as TMediaQueryCollection<T>,
          autoGetOtherItem,
        )
      : itemCollection,
  );

  // eslint-disable-next-line
  const onResize = useCallback(
    _debounce(() => {
      const item = getItemBelongsBreakPoint<T>(
        itemCollection as TMediaQueryCollection<T>,
        autoGetOtherItem,
      );
      setCurrentItem(item);
    }, 150),
    [itemCollection, autoGetOtherItem],
  );

  useLayoutEffect(() => {
    if (Array.isArray(itemCollection)) {
      const item = getItemBelongsBreakPoint<T>(
        itemCollection as TMediaQueryCollection<T>,
        autoGetOtherItem,
      );
      setCurrentItem(item);
      window.addEventListener("resize", onResize);
    }
    return () => {
      if (Array.isArray(itemCollection))
        window.removeEventListener("resize", onResize);
    };
  }, [onResize, itemCollection, autoGetOtherItem]);

  return [currentItem, setCurrentItem];
}
