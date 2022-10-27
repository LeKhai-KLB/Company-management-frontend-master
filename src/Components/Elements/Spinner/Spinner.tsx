import { useLayoutEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import type { LoaderSizeProps } from "react-spinners/helpers/props";
import "./Spinner.scss";

export const Spinner = ({ size, ...props }: LoaderSizeProps) => {
  const [currentSize, setCurrentSize] = useState(size);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(
    () => {
      if (!size) {
        if (wrapperRef && wrapperRef.current) {
          const fontSize = window
            .getComputedStyle(wrapperRef.current, null)
            .getPropertyValue("font-size");
          if (Number(fontSize.replace("px", "")))
            setCurrentSize(Number(fontSize.replace("px", "")));
        }
      }
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <div ref={wrapperRef} className={"spinner"}>
      <MoonLoader size={currentSize} {...props}></MoonLoader>
    </div>
  );
};
