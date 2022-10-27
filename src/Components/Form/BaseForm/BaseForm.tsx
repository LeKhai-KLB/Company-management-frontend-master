import clsx from "clsx";
import { useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormProps,
  useFormState,
} from "react-hook-form";
import * as yup from "yup";
import { TWrapperProps } from "~utils/mixins.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { THandleChangeFormState } from "~/hooks/form";
import "./BaseForm.scss";

export type TFormProps<TFormValues, TSchema> = TWrapperProps & {
  onSubmit: SubmitHandler<TFormValues & FieldValues>;
  handleChangeFormState: () => THandleChangeFormState<TFormValues>;
  options?: UseFormProps<TFormValues & FieldValues>;
  id?: string;
  schema?: TSchema;
};

export type TYupSchema<TSchema> = yup.AnyObjectSchema &
  Record<keyof TSchema, yup.AnySchema>;

export const BaseForm = <TFormValues, TSchema>({
  onSubmit,
  handleChangeFormState,
  children,
  options,
  id,
  schema,
  className,
  style,
}: TFormProps<TFormValues, TSchema>) => {
  const { control, ...useFormReturn } = useForm<TFormValues & FieldValues>({
    ...options,
    resolver: schema && yupResolver(schema as unknown as TYupSchema<TSchema>),
  });

  const { dirtyFields, isValid, errors } = useFormState({
    control,
  });

  useEffect(
    () => {
      const methods = handleChangeFormState();
      if (useFormReturn)
        methods.setFormReturnValue({ ...useFormReturn, control });
    },
    // eslint-disable-next-line
    [],
  );

  useEffect(
    () => {
      const methods = handleChangeFormState();
      methods.setFormState({ ...{ errors, isValid, dirtyFields } });
    },
    // eslint-disable-next-line
    [Object.keys(dirtyFields).length, errors, isValid],
  );

  return (
    <form
      style={style}
      onSubmit={useFormReturn.handleSubmit(onSubmit)}
      className={clsx("base-form", className)}
      id={id}>
      {children}
    </form>
  );
};
