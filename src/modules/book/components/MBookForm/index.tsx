import { Button, FormControlLabel, Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import {
  CInput,
  CTextArea,
} from "src/common/components/controls";
import { bookCreateResolver } from "../../validate";
import { IMBookFormProps } from "./types";
import { useForm } from "src/utils/form";
import { ICreateOrUpdateBookParams } from 'src/apis/book/types';
import { MImageSelector } from './ImageSelector';

export const MBookForm = ({
  defaultImageUrl,
  value,
  onSubmit,
  onCancel,
}: IMBookFormProps) => {
  const { control, handleSubmit, formState } = useForm<ICreateOrUpdateBookParams>(onSubmit, {
    defaultValues: { ...value },
    resolver: bookCreateResolver,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field }) => <CInput label="Name" {...field} />}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => <CTextArea label="Description" {...field} />}
        />
        <Controller
          control={control}
          name="url"
          render={({ field }) => <CInput label="Book URL" {...field} />}
        />
        <Controller
          control={control}
          name="image_id"
          render={({ field }) => (
            <MImageSelector 
              label="Book Image" 
              value={field.value}
              defaultUrl={defaultImageUrl} 
              onChange={field.onChange} 
            />
          )}
        />
        <Controller
          control={control}
          name="is_pin"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch checked={field.value} />}
              label="Public"
              {...field}
              onChange={(e, v) => field.onChange(v)}
            />
          )}
        />
      </div>
      <div className="flex justify-end gap-x-4">
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
};

MBookForm.defaultProps = {
  edit: false,
  value: {
    name: "",
    description: "",
    url: "",
    is_pin: false,
    image_id: "",
  },
};
