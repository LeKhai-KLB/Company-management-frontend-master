import { BaseField, TBaseFieldProps } from "../BaseField";
import { useGetSizeBelongsMediaQuery } from "~hooks/media-query";
import { TElementProps } from "~/utils/mixins.type";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";
import "../Field.share.scss";
import { TTextareaProps } from "../../Textarea";
import { Tooltip } from "@mui/material";
import "./TextField.scss";
import { useState } from "react";
import { copyTextToClipboard } from "~/utils/copyTextToClipboard";

type TInputFieldProps = TElementProps &
  TBaseFieldProps &
  TTextareaProps & {
    value?: string | number;
    acceptedCopy?: boolean;
  };

export const TextField = ({
  label,
  style,
  value,
  readOnly,
  acceptedCopy,
  sizeKey = "small",
  className,
}: Omit<TInputFieldProps, "children" | "erorrMessage" | "invalid">) => {
  const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);
  const [open, setOpenTooltip] = useState(false);

  const handleCloseTooltip = () => {
    setTimeout(() => {
      setOpenTooltip(false);
    }, 300);
  };

  const handleOpenTooltip = async () => {
    setOpenTooltip(true);
    await copyTextToClipboard(String(value));
  };

  return (
    <BaseField
      label={label}
      style={{ pointerEvents: "none", ...style }}
      isTextField
      readOnly={readOnly}
      className={className}
      size={currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey]}>
      <div
        className="text-field__content_container"
        style={{ fontSize: TYPOGRAPHY_SIZE[currentSizeKey] }}>
        {value}
        {acceptedCopy && (
          <Tooltip
            open={open}
            onClose={handleCloseTooltip}
            placement={"left-end"}
            title={
              <span className="text-field__tooltip-title">{"copied ✔"}</span>
            }>
            <div
              className={"text-field__copy-button"}
              onClick={handleOpenTooltip}>
              <i className="icon-clipboard" />
            </div>
          </Tooltip>
        )}
      </div>
    </BaseField>
  );
};
