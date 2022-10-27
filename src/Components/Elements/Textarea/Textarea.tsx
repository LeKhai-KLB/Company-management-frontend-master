import clsx from "clsx";
import { TextareaHTMLAttributes, useLayoutEffect, useMemo } from "react";
import type { UseFormRegister } from "react-hook-form";
import {
  TSizeKeyWithBreakpoint,
  useGetSizeBelongsMediaQuery,
} from "~hooks/media-query";
import "./Textarea.scss";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";

export type TTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullWidth?: boolean;
  activeForcus?: boolean;
  sizeKey?: TSizeKeyWithBreakpoint;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  isTextArea?: boolean;
  register?: UseFormRegister<any>;
};

export const Textarea = ({
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
}: TTextareaProps) => {
  const [currentSizeKey, setCurrentSize] = useGetSizeBelongsMediaQuery(sizeKey);

  useLayoutEffect(() => {
    setCurrentSize(sizeKey);
  }, [sizeKey, setCurrentSize]);

  const classNames = clsx(
    "textarea",
    fullWidth && "textarea--full-width",
    !invalid && activeForcus && "textarea--focus",
    readOnly && "textarea--read-only",
    invalid && "textarea--invalid",
  );

  const currentRegister = useMemo(
    () => (register ? register(name!, { required }) : {}),
    [register, name, required],
  );

  return (
    <>
      <textarea
        rows={3}
        spellCheck={false}
        className={classNames + " " + className}
        style={{
          fontSize: TYPOGRAPHY_SIZE[currentSizeKey!],
          ...style,
          padding: `${currentSizeKey === "extra-small" ? "7.5px" : "6px"} 16px`,
        }}
        readOnly={readOnly}
        {...props}
        {...currentRegister}
      />
    </>
  );
};
