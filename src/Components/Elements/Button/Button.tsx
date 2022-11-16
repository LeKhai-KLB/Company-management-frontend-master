import { forwardRef, HTMLProps, useState, MouseEvent, useEffect } from "react";
import { Button as MUIButton } from "@mui/material";
import type { ButtonProps as TMUIButtonProps } from "@mui/material/Button";
import "./Button.scss";
import clsx from "clsx";
import { Spinner } from "../Spinner";
import {
  TSizeKeyWithBreakpoint,
  useGetSizeBelongsMediaQuery,
} from "~hooks/media-query";

type TButtonVariants = {
  [key: string]: {
    variant: "contained" | "text" | "outlined" | undefined;
    className: string;
    active?: boolean;
  };
};

const variants: TButtonVariants = {
  basic: { variant: "contained", className: "button--basic" },
  text: { variant: "text", className: "button--text" },
  submit: { variant: "contained", className: "button--submit" },
  danger: { variant: "contained", className: "button--danger" },
  cancel: { variant: "contained", className: "button--cancel" },
  "toggle-to-active": {
    variant: "contained",
    className: "button--toggle-to-active",
  },
  "toggle-to-cancel": {
    variant: "contained",
    className: "button--toggle-to-cancel",
  },
};

const sizeClasses = {
  "extra-small": "button--extra-small",
  small: "button--small",
  medium: "button--medium",
  large: "button--large",
  "extra-large": "button--extra-large",
};

type TCustomButtonProps = {
  variantKey?:
    | "basic"
    | "text"
    | "submit"
    | "danger"
    | "cancel"
    | "toggle-to-active"
    | "toggle-to-cancel";
  sizeKey?: TSizeKeyWithBreakpoint;
  isBoldTextStyle?: boolean;
  rounded?: boolean;
  loading?: boolean;
};
type TButtonProps = HTMLProps<HTMLButtonElement> & TCustomButtonProps;
type TButtonEvent = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;

const checkVariantKey = (variantKey: string) => {
  if (variantKey === "toggle-to-active") return false;
  if (variantKey === "toggle-to-cancel") return true;
  return undefined;
};

export const Button = forwardRef<
  HTMLButtonElement,
  TMUIButtonProps & TButtonProps
>(
  (
    {
      rounded = false,
      isBoldTextStyle = true,
      className,
      children,
      variantKey = "basic",
      sizeKey = "small",
      disabled,
      onClick,
      loading,
      ...props
    },
    ref,
  ) => {
    const [active, setActive] = useState(() => checkVariantKey(variantKey));
    const [isLoading, setIsLoading] = useState(false);
    const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);

    useEffect(() => {
      setActive(checkVariantKey(variantKey));
    }, [variantKey]);

    const handleAsyncFunction = async (
      asyncFunc: Function,
      event: TButtonEvent,
    ) => {
      setIsLoading(true);
      await asyncFunc(event);
      setIsLoading(false);
    };

    const handleClick = async (event: TButtonEvent) => {
      if (onClick?.constructor.name === "AsyncFunction")
        await handleAsyncFunction(onClick, event);
      else {
        onClick && onClick(event);
      }
      if (active !== undefined) {
        setActive(!active);
      }
    };

    const classNames = clsx(
      active !== undefined
        ? !active
          ? variants["toggle-to-active"].className
          : variants["toggle-to-cancel"].className
        : variants[variantKey].className,
      sizeClasses[currentSizeKey!],
      disabled && "button--disabled",
      isBoldTextStyle && "button--typography-bold",
      rounded && "button--rounded",
      className && className,
    );

    return (
      <MUIButton
        className={classNames}
        variant={variants[variantKey].variant}
        disabled={disabled || isLoading || loading}
        onClick={handleClick}
        ref={ref}
        {...props}>
        {
          <div className={"button__content-container"}>
            {children}
            {(isLoading || loading) && <Spinner color={"white"} />}
          </div>
        }
      </MUIButton>
    );
  },
);
