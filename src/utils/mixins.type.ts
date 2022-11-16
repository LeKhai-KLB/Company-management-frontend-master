import { CSSProperties } from "react";
import { ReactNode } from "react";
export type TWrapperProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type TElementProps = {
  className?: string;
  style?: CSSProperties;
};

export type TFormDataProps<TFormData> = {
  readOnly?: boolean;
  formData?: TFormData;
  acceptEditMode?: boolean;
};
