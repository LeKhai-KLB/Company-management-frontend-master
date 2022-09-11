import { memo } from "react";
import clsx from "clsx";
import { TElementProps } from "~utils/mixins.type";

export const Header = memo(({ className }: TElementProps) => {
  const classNames = clsx(className || "");

  return (
    <div className={classNames}>
      <h1>Halo</h1>
    </div>
  );
});
