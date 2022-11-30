import clsx from "clsx";
import { SelectHTMLAttributes, useLayoutEffect, useState } from "react";
import {
  TSizeKeyWithBreakpoint,
  useGetSizeBelongsMediaQuery,
} from "~hooks/media-query";
import "./Select.scss";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";

export type TSelectData = {};

export type TSelectProps<TOutput> = SelectHTMLAttributes<HTMLSelectElement> & {
  fullWidth?: boolean;
  sizeKey?: TSizeKeyWithBreakpoint;
  data?: Array<{ label: string; value: TOutput }>;
  defaultSelected?: number;
  onChangeSelected?: (value: TOutput) => void;
};

export const Select = <TOutput,>({
  required,
  fullWidth,
  className,
  defaultSelected = 0,
  sizeKey = "small",
  style,
  data,
  onChangeSelected,
  ...props
}: TSelectProps<TOutput>) => {
  const [currentSizeKey, setCurrentSizeKey] =
    useGetSizeBelongsMediaQuery(sizeKey);
  const [currentIndex, setCurrentIndex] = useState(defaultSelected);

  useLayoutEffect(
    () => {
      if (typeof sizeKey === "string") setCurrentSizeKey(sizeKey);
    },
    // eslint-disable-next-line
    [sizeKey],
  );

  const classNames = clsx(
    "select",
    fullWidth && "select--full-width",
    className,
  );

  const handleChange = async (index: number) => {
    onChangeSelected && (await onChangeSelected(data[index].value));
    setCurrentIndex(index);
  };

  return (
    <select
      spellCheck={false}
      onChange={(e) => handleChange(Number(e.target.value))}
      className={classNames}
      value={currentIndex}
      style={{
        fontSize: TYPOGRAPHY_SIZE[currentSizeKey!],
        ...style,
        padding: `${currentSizeKey === "extra-small" ? "7.5px" : "6px"} 16px`,
      }}
      {...props}>
      {data &&
        data.map((val, index) => {
          return (
            <option className="select__option" key={index} value={index}>
              {val.label}
            </option>
          );
        })}
    </select>
  );
};
