import { TWrapperProps } from "~/utils/mixins.type";
import "./BaseField.scss";

export type TBaseFieldProps = TWrapperProps & {
  label?: string;
  size?: number;
  errorMessage?: string;
  isTextField?: boolean;
  name?: string;
  readOnly?: boolean;
};

export const BaseField = ({
  errorMessage,
  isTextField = false,
  style,
  size,
  label,
  name,
  readOnly,
  children,
  className,
}: TBaseFieldProps) => {
  return (
    <div style={style} className={"field " + className}>
      <label
        htmlFor={`ip-${name}`}
        style={{ fontSize: size }}
        className={`field__label ${readOnly && "field__label--read-only"}`}>
        {label}
      </label>
      <div className="field__content">{children}</div>
      {!isTextField && (
        <span
          style={{ visibility: errorMessage ? "visible" : "hidden" }}
          className="field__error">
          {errorMessage ? errorMessage : "none"}
        </span>
      )}
    </div>
  );
};
