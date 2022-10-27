import { BaseField, TBaseFieldProps } from "../BaseField";
import { useGetSizeBelongsMediaQuery } from "~hooks/media-query";
import { TElementProps } from "~/utils/mixins.type";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";
import "../Field.share.scss";
import { TTextareaProps } from "../../Textarea";

type TInputFieldProps = TElementProps &
  TBaseFieldProps &
  TTextareaProps & {
    value?: string | number;
  };

export const TextField = ({
  label,
  style,
  value,
  readOnly,
  sizeKey = "small",
  className,
}: Omit<TInputFieldProps, "children" | "erorrMessage" | "invalid">) => {
  const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);

  return (
    <BaseField
      label={label}
      style={{ pointerEvents: "none", ...style }}
      isTextField
      readOnly={readOnly}
      className={className}
      size={currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey]}>
      {value}
    </BaseField>
  );
};
