import { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  FieldErrorsImpl,
  Path,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { FieldValues } from "react-hook-form";

export type TSetFormReturnValue<TFormValues> = Dispatch<
  SetStateAction<UseFormReturn<TFormValues & FieldValues, any>>
>;

export type TSetFormState = Dispatch<SetStateAction<TFormState>>;
export type THandleChangeFormState<TFormValues> = {
  setFormReturnValue: TSetFormReturnValue<TFormValues>;
  setFormState: TSetFormState;
};

export type TUseCustomForm<TFormValues> = UseFormReturn<
  TFormValues & FieldValues,
  any
> & {
  handleChangeFormState: THandleChangeFormState<TFormValues>;
  active?: boolean;
  requiredProps: {
    register?: UseFormRegister<TFormValues & FieldValues>;
    errors?: FieldErrorsImpl<{
      [x: string]: any;
    }>;
  };
};

type TFormState = {
  errors: any;
  isValid: boolean;
  dirtyFields: any;
};

export function useCustomForm<TFormValues>(): TUseCustomForm<TFormValues> {
  const [formReturnValue, setFormReturnValue] =
    useState<UseFormReturn<TFormValues & FieldValues>>();
  const [formState, setFormState] = useState<TFormState>(
    formReturnValue?.formState,
  );
  const [isActive, setActive] = useState(false);

  useEffect(
    () => {
      if (formState) {
        if (!formState.isValid) {
          const fieldValue = formReturnValue.getValues();
          if (
            Object.keys(formState.dirtyFields).length <
            Object.keys(fieldValue).length
          ) {
            setActive(false);
            formReturnValue.clearErrors &&
              formReturnValue.clearErrors(
                Object.keys(formState.errors) as unknown as Path<
                  TFormValues & {}
                >,
              );
          } else {
            setActive(true);
          }
        } else {
          setActive(true);
        }
      }
    },
    // eslint-disable-next-line
    [formReturnValue, formState],
  );

  return {
    ...formReturnValue,
    active: isActive,
    handleChangeFormState: {
      setFormReturnValue,
      setFormState,
    },
    requiredProps: {
      register: formReturnValue?.register,
      errors: formState?.errors,
    },
  };
}
