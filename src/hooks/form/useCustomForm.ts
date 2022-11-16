import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import {
  FieldErrorsImpl,
  FormState,
  Path,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { FieldValues } from "react-hook-form";

export type THandleChangeFormState<TFormValues> = {
  setFormReturnValue: Dispatch<
    SetStateAction<UseFormReturn<TFormValues & FieldValues, any>>
  >;
  setFormState: Dispatch<SetStateAction<FormState<TFormValues & FieldValues>>>;
};

export type TUseCustomForm<TFormValues> = UseFormReturn<
  TFormValues & FieldValues,
  any
> & {
  handleChangeFormState: THandleChangeFormState<TFormValues>;
  active?: boolean;
  restore: () => void;
  isReadOnly?: boolean;
  isSubmitting?: boolean;
  setIsReadOnly?: Dispatch<SetStateAction<boolean>>;
  currentFormData: TFormValues;
  setCurrentFormData: (values: TFormValues) => void;
  requiredProps: {
    register?: UseFormRegister<TFormValues & FieldValues>;
    errors?: FieldErrorsImpl<{
      [x: string]: any;
    }>;
  };
};

type TUseCustomFormProps<TFormValues> = {
  initialData?: TFormValues;
  initialReadOnlyState?: boolean;
};

export function useCustomForm<TFormValues>(
  options: TUseCustomFormProps<TFormValues> = {},
): TUseCustomForm<TFormValues> {
  const [currentFormData, setCurrentFormData] = useState(options?.initialData);
  const [currentReadOnlyState, setCurrentReadOnlyState] = useState(
    options?.initialReadOnlyState,
  );
  const [formReturnValue, setFormReturnValue] =
    useState<UseFormReturn<TFormValues & FieldValues>>();
  const [formState, setFormState] = useState<
    FormState<TFormValues & FieldValues>
  >(formReturnValue?.formState);
  const [isActive, setActive] = useState(false);

  const restore = useCallback(
    () => {
      if (formReturnValue) {
        const { setValue } = formReturnValue;
        setValue &&
          currentFormData &&
          Object.entries(currentFormData).forEach(([name, value]) => {
            setValue(name as Path<TFormValues>, value);
          });
      }
    },
    // eslint-disable-next-line
    [formReturnValue],
  );

  const handleSetCurrentFormData = (values: TFormValues) => {
    if (JSON.stringify(values) !== JSON.stringify(currentFormData)) {
      setCurrentFormData(values);
    }
  };

  useEffect(
    () => {
      if (options?.initialReadOnlyState !== currentReadOnlyState)
        setCurrentReadOnlyState(options?.initialReadOnlyState);
    },
    // eslint-disable-next-line
    [options?.initialReadOnlyState],
  );

  useEffect(
    () => {
      if (formState && formReturnValue) {
        const { getValues, clearErrors } = formReturnValue;
        const { dirtyFields, errors, isValid } = formState;
        if (!isValid) {
          const fieldValue = getValues();
          if (
            Object.keys(dirtyFields).length < Object.keys(fieldValue).length
          ) {
            setActive(false);
            clearErrors &&
              clearErrors(
                Object.keys(errors) as unknown as Path<TFormValues & {}>,
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
    restore,
    isReadOnly: currentReadOnlyState,
    isSubmitting: formState?.isSubmitting,
    setIsReadOnly: setCurrentReadOnlyState,
    currentFormData,
    setCurrentFormData: handleSetCurrentFormData,
    requiredProps: {
      register: formReturnValue?.register,
      errors: formState?.errors,
    },
  };
}
