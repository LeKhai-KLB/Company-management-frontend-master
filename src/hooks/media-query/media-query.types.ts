export type TSizeKey =
  | "extra-small"
  | "extra-large"
  | "small"
  | "medium"
  | "large";

export type TMediaQueryCollection<T> = [xs?: T, sm?: T, md?: T, lg?: T, xl?: T];

export type TItemCollection<T> = T | TMediaQueryCollection<T>;
export type TGetItemOptions = { autoGetOtherItem: boolean };

export type TSizeKeyWithBreakpoint =
  | TItemCollection<TSizeKey>
  | "auto-responsive";
