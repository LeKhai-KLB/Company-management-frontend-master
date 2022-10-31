import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Elements/Button";
import { LazyImage } from "../LazyImage";
import { TLazyImageProps } from "../LazyImage/LazyImage";
import "./UploadImage.scss";

export type TUploadImageProps = TLazyImageProps & {
  readOnly?: boolean;
  onChangeFile?: (file: File) => void;
  file?: File;
};

export const UploadImage = ({
  readOnly,
  onChangeFile,
  file,
  src,
  className,
  style,
  ...props
}: TUploadImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  // eslint-disable-next-line
  const [currentFile, setCurrentFile] = useState<File | undefined>(file);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = () => {
    inputRef && inputRef.current?.click();
  };

  const handleChangeInputFile = async (
    target: EventTarget & HTMLInputElement,
  ) => {
    const newFile = target && target.files ? target.files[0] : null;
    if (newFile) {
      const previewImage = URL.createObjectURL(newFile);
      (await onChangeFile) && onChangeFile(newFile);
      setCurrentSrc(previewImage);
      setCurrentFile(newFile);
    }
  };

  const handeCancelUpload = async () => {
    currentSrc && URL.revokeObjectURL(currentSrc);
    if (inputRef && inputRef.current) inputRef.current.value = "";
    (await onChangeFile) && onChangeFile(undefined);
    setCurrentFile(undefined);
    setCurrentSrc(src);
  };

  useEffect(
    () => {
      if (src !== currentSrc) {
        setCurrentSrc(src);
        setCurrentFile(undefined);
      }
    },
    // eslint-disable-next-line
    [src],
  );

  useEffect(
    () => {
      if (!file) {
        setCurrentSrc(src);
        setCurrentFile(undefined);
      }
    },
    // eslint-disable-next-line
    [file],
  );

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
