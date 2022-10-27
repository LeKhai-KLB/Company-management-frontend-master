import { BaseField, TBaseFieldProps } from "../BaseField";
import { useGetSizeBelongsMediaQuery } from "~hooks/media-query";
import { TWrapperProps } from "~/utils/mixins.type";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";
import { FieldErrorsImpl } from "react-hook-form";
import "../Field.share.scss";
import { Textarea, TTextareaProps } from "../../Textarea";

const variants = {
  normal: "field__normal-variant",
  app: "field__app-variant",
};

type TInputFieldProps = TWrapperProps &
  TBaseFieldProps &
  TTextareaProps & {
    errors?: FieldErrorsImpl<{
      [x: string]: any;
    }>;
    variantKey?: "normal" | "app";
  };

export const TextareaField = ({
  label,
  name,
  style,
  sizeKey = "small",
  errors,
  className,
  readOnly,
  variantKey = "normal",
  ...props
}: Omit<TInputFieldProps, "children" | "erorrMessage" | "invalid">) => {
  const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);

  return (
    <BaseField
      label={label}
      name={name}
      style={style}
      className={className}
      readOnly={readOnly}
      errorMessage={
        errors && name && errors[name]
          ? (errors[name]?.message as string)
          : undefined
      }
      size={currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey]}>
      <div className={"field__container"}>
        <Textarea
          id={`ip-${name}`}
          readOnly={readOnly}
          invalid={errors && name && errors[name] ? true : false}
          name={name}
          sizeKey={currentSizeKey}
          {...(props as TTextareaProps)}
          className={variants[variantKey]}
        />
      </div>
    </BaseField>
  );
};
