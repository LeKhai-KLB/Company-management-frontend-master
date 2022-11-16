import clsx from "clsx";
import { InputHTMLAttributes, useLayoutEffect, useMemo } from "react";
import type { UseFormRegister } from "react-hook-form";
import {
  TSizeKeyWithBreakpoint,
  useGetSizeBelongsMediaQuery,
} from "~hooks/media-query";
import "./Input.scss";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
  activeForcus?: boolean;
  sizeKey?: TSizeKeyWithBreakpoint;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  register?: UseFormRegister<any>;
};

export const Input = ({
  name,
  required,
  invalid,
  fullWidth,
  className,
  readOnly,
  register,
  activeForcus = true,
  sizeKey = "small",
  style,
  ...props
}: TInputProps) => {
  const [currentSizeKey, setCurrentSizeKey] =
    useGetSizeBelongsMediaQuery(sizeKey);

  useLayoutEffect(
    () => {
      if (typeof sizeKey === "string") setCurrentSizeKey(sizeKey);
    },
    // eslint-disable-next-line
    [sizeKey],
  );

  const classNames = clsx(
    "input",
    fullWidth && "input--full-width",
    !invalid && activeForcus && "input--focus",
    className,
    readOnly && "input--read-only",
    invalid && "input--invalid",
  );

  const currentRegister = useMemo(
    () => (register ? register(name!, { required }) : {}),
    [register, name, required],
  );

  return (
    <input
      spellCheck={false}
      className={classNames}
      style={{
        fontSize: TYPOGRAPHY_SIZE[currentSizeKey!],
        ...style,
        padding: `${currentSizeKey === "extra-small" ? "7.5px" : "6px"} 16px`,
      }}
      readOnly={readOnly}
      {...props}
      {...currentRegister}
    />
  );
};
