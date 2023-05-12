import { Button, FormControlLabel, Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import { hashTagAPI } from "src/apis/hashtag";
import {
  CInput,
  CTextArea,
  CInfinitySelect,
} from "src/common/components/controls";
import { blogCreateResolver } from "../../validate";
import { IBlogRequest } from "src/apis/blog/types";
import { IHashtagResponse } from "src/apis/hashtag/types";
import { IMBlogFormProps } from "./types";
import { useForm } from "src/utils/form";
import dynamic from "next/dynamic";

const CEditor = dynamic(
  () => import("src/common/components/controls/CEditor").then((m) => m.CEditor),
  { ssr: false }
);

export const MBlogForm = ({
  initialTags,
  value,
  onSubmit,
  onCancel,
}: IMBlogFormProps) => {
  const { control, handleSubmit, setValue } = useForm<IBlogRequest>(onSubmit, {
    defaultValues: { ...value },
    resolver: blogCreateResolver,
  });

  const fetcher = (page: number) =>
    hashTagAPI
      .get({ page, pages: 0, size: 10 })
      .then((res) => res.data?.data ?? []);

  const onTagChange = (value: any) => {
    setValue("hashtag_ids", value);
  };

  const onTagCreate = async (
    value: string
  ): Promise<IHashtagResponse | null> => {
    try {
      const res = await hashTagAPI.create({ name: value });

      if (res.data._id) {
        return { _id: res.data._id, name: value };
      }

      return null;
    } catch {
      return null;
    }
  };

  return (
    <>
      <div className="flex flex-row gap-4 items-end">
        <Controller
          control={control}
          name="title"
          render={({ field }) => <CInput label="Name" {...field} />}
        />
        <Controller
          control={control}
          name="is_public"
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
      <div>
        <Controller
          control={control}
          name="hashtag_ids"
          render={({ field }) => (
            <CInfinitySelect
              id="hashtag"
              label="Hashtag"
              multiple
              initial={initialTags}
              {...field}
              fetch={fetcher}
              onCreate={onTagCreate}
              onChange={onTagChange}
            />
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="description"
          render={({ field }) => <CTextArea label="Description" {...field} />}
        />
      </div>
      <div>
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <CEditor
              id="blog-editor"
              label={"Content"}
              {...field}
              onChange={(v) => setValue("content", v)}
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

MBlogForm.defaultProps = {
  initalTags: [],
  edit: false,
  value: {
    title: "",
    description: "",
    content: "",
    is_public: false,
    hashtag_ids: [],
  },
};
