import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../Elements/Button";
import { LazyImage } from "../LazyImage";
import { TLazyImageProps } from "../LazyImage/LazyImage";
import "./UploadImage.scss";

export type TUploadImageProps = TLazyImageProps & {
  readOnly?: boolean;
  onChange?: (file: File) => void;
};

export const UploadImage = ({
  readOnly,
  onChange,
  src,
  className,
  style,
  ...props
}: TUploadImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  // eslint-disable-next-line
  const [currentFile, setCurrentFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = () => {
    inputRef && inputRef.current?.click();
  };

  const handleChangeInputFile = async (
    target: EventTarget & HTMLInputElement,
  ) => {
    const file = target && target.files ? target.files[0] : null;
    if (file) {
      const previewImage = URL.createObjectURL(file);
      setCurrentSrc(previewImage);
      setCurrentFile(file);
      onChange && (await onChange(file));
    }
  };

  const handeCancelUpload = () => {
    currentSrc && URL.revokeObjectURL(currentSrc);
    if (inputRef && inputRef.current) inputRef.current.value = "";
    setCurrentFile(undefined);
    setCurrentSrc(src);
  };

  return (
    <div className={"upload-image " + className} style={style}>
      {!readOnly && (
        <>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeInputFile(e.target)
            }
            ref={inputRef}
            type="file"
            className={"upload-image__input"}
          />
          <div
            onClick={currentSrc === src ? handleClickInput : handeCancelUpload}
            className={"upload-image__overlay"}>
            <Button
              variantKey={"text"}
              sizeKey={["small", "medium", "large"]}
              className={"upload-image__overlay__button"}>
              <i
                className={
                  currentSrc === src ? "icon-edit" : "icon-close-solid"
                }
              />
            </Button>
          </div>
        </>
      )}
      <LazyImage
        className={className}
        style={style}
        {...props}
        src={currentSrc}
      />
    </div>
  );
};