import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";

export type TRequiredFormProps = {
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  errors?: FieldErrorsImpl<{
    [x: string]: any;
  }>;
  required?: boolean;
};

export function requiredFormProps({
  label,
  name,
  register,
  errors,
  required = true,
}: TRequiredFormProps) {
  return { label, name, register, errors, required };
}
