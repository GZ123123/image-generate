import { useState } from "react";
import {
  FieldValues,
  UseFormProps,
  useForm as useHookForm,
} from "react-hook-form";
import { toast } from "react-toastify";
import { IAPIResponse } from "src/common/interfaces";

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(
  onSubmit: (data: FieldValues) => Promise<IAPIResponse<any> | null>,
  props: UseFormProps<TFieldValues, TContext> & {
    successMessage?: string;
    errorMessage?: string;
    success?: () => any;
    error?: () => any;
  }
) => {
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, ...other } = useHookForm(props);

  const trySubmit = handleSubmit(async (v: FieldValues) => {
    if (isLoading) {
      toast.warning("Saving process is processing");
      return;
    }

    try {
      setLoading(true);

      const res = await onSubmit(v);

      if (res?.errorCode === 0) {
        toast.success(props.successMessage ?? "Save Successful");

        props.success && props.success();
      } else {
        toast.error(res?.message ?? props.errorMessage ?? "Save Error");

        props.error && props.error();
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      toast.error(error?.message ?? props.errorMessage ?? "Save Error");

      props.error && props.error();
    }
  });

  return {
    isLoading,
    handleSubmit: trySubmit,
    ...other,
  };
};
