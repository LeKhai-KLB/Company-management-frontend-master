import { BaseField, TBaseFieldProps } from "../BaseField";
import { Input, TInputProps } from "../../Input";
import { useGetSizeBelongsMediaQuery } from "~hooks/media-query";
import { TWrapperProps } from "~/utils/mixins.type";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";
import { FieldErrorsImpl } from "react-hook-form";
import { useState } from "react";
import "../Field.share.scss";

const variants = {
  normal: "field__normal-variant",
  app: "field__app-variant",
};

type TInputFieldProps = TWrapperProps &
  TBaseFieldProps &
  TInputProps & {
    errors?: FieldErrorsImpl<{
      [x: string]: any;
    }>;
    variantKey?: "normal" | "app";
  };

export const InputField = ({
  label,
  name,
  style,
  sizeKey = "small",
  errors,
  className,
  variantKey = "normal",
  readOnly,
  type,
  ...props
}: Omit<TInputFieldProps, "children" | "erorrMessage" | "invalid">) => {
  const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);
  const [currentType, setcurrentType] = useState(type);

  const handleClickShowText = () => {
    setcurrentType((prev) => {
      if (prev === "password") return "text";
      return "password";
    });
  };

  return (
    <BaseField
      label={label}
      name={name}
      style={style}
      readOnly={readOnly}
      className={className}
      errorMessage={
        errors && name && errors[name]
          ? (errors[name]?.message as string)
          : undefined
      }
      size={currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey]}>
      <div className={"field__container"}>
        <Input
          id={`ip-${name}`}
          type={currentType}
          invalid={errors && name && errors[name] ? true : false}
          name={name}
          sizeKey={currentSizeKey}
          readOnly={readOnly}
          {...(props as TInputProps)}
          style={{
            borderTopRightRadius: type === "password" ? "0px" : "4px",
            borderBottomRightRadius: type === "password" ? "0px" : "4px",
          }}
          className={variants[variantKey]}
        />
        {type === "password" && (
          <div
            onClick={handleClickShowText}
            className={"field__show-text-button hover-effect"}>
            <i
              style={{
                fontSize: currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey],
                height: currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey],
              }}
              className={`icon-${
                currentType === "password" ? "eye-blocked" : "view-show"
              }`}
            />
          </div>
        )}
      </div>
    </BaseField>
  );
};
