import { ICDeleteDialog } from "./type";
import { Box, Button, Modal, Typography } from "@mui/material";
import { classNames } from "src/utils/class-names";

export const CDeleteDialog = ({ open, onOk, onCancel }: ICDeleteDialog) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        component="div"
        className={classNames(
          "absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2",
          "bg-white p-4 rounded flex flex-col gap-y-4"
        )}
      >
        <h1 className="text-xl">Delete</h1>
        <Typography className="text-md">
          Are you sure you want to delete this?
        </Typography>
        <div className="flex justify-end gap-x-4">
          <Button variant="contained" onClick={onOk}>
            OK
          </Button>
          <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
