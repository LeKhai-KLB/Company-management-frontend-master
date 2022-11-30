import { BaseField, TBaseFieldProps } from "../BaseField";
import { useGetSizeBelongsMediaQuery } from "~hooks/media-query";
import { TWrapperProps } from "~/utils/mixins.type";
import { TYPOGRAPHY_SIZE } from "~constants/constants.app";
import "./SelectField.scss";
import { Select, TSelectProps } from "../../Select";

const variants = {
  normal: "select-field__normal",
  app: "select-field__app",
};

type TInputFieldProps<TOuput> = TWrapperProps &
  TBaseFieldProps &
  TSelectProps<TOuput> & {
    variantKey?: "normal" | "app";
  };

export const SelectField = <TOutput,>({
  label,
  name,
  style,
  sizeKey = "small",
  className,
  variantKey = "normal",
  readOnly,
  ...props
}: Omit<
  TInputFieldProps<TOutput>,
  "children" | "erorrMessage" | "invalid"
>) => {
  const [currentSizeKey] = useGetSizeBelongsMediaQuery(sizeKey);

  return (
    <BaseField
      label={label}
      name={name}
      style={style}
      readOnly={readOnly}
      className={className}
      size={currentSizeKey && TYPOGRAPHY_SIZE[currentSizeKey]}>
      <div className={"field__container"}>
        <Select<TOutput>
          id={`ip-${name}`}
          sizeKey={currentSizeKey}
          {...(props as TSelectProps<TOutput>)}
          className={variants[variantKey]}
        />
      </div>
    </BaseField>
  );
};
