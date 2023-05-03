import { Box, Button, Modal } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CInput, CUpload } from "src/common/components/controls";
import { classNames } from "src/utils/class-names";
import { IResourceForm, IMFormProps } from "./types";
import { toast } from "react-toastify";

export const MForm = ({ resource, onSubmit, onClose }: IMFormProps) => {
  const { control, handleSubmit } = useForm<IResourceForm>({
    defaultValues: {
      key: resource.key,
    },
  });

  const submit = handleSubmit(async (v) => {
    const res = await onSubmit(v);

    if (res?._id) {
      toast.success("Save Successful");
      setTimeout(onClose, 300);
    } else {
      toast.success("Save Error");
    }
  });

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        component="div"
        className={classNames(
          "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
          "bg-white p-4 rounded "
        )}
      >
        <div className="flex gap-2 flex-col">
          <div>
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <CUpload
                  id="file-upload"
                  {...field}
                  value={field.value || resource?.url || ""}
                />
              )}
            />
          </div>
          <div className="px-3 pb-3">
            <Controller
              control={control}
              name="key"
              render={({ field }) => <CInput label="key" id="key" {...field} />}
            />
          </div>
        </div>

        <div className="w-full px-3 mt-2 flex justify-end">
          <Button className="w-full" variant="contained" onClick={submit}>
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
