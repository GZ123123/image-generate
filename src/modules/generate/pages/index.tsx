import { CInput } from "src/common/components/controls";
import { Controller, useForm } from "react-hook-form";
import { generateAPIClient } from "src/apis/generate/client";
import { IMGeneratePageProps } from "../type";
import { LinkIcon } from "@heroicons/react/24/outline";
import { urlResolver } from "../validate";
import { useState } from "react";
import { CCopy } from "src/common/components/others/CCopy";

export const MGeneratePage = ({ value, onChange }: IMGeneratePageProps) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { image: "" },
    resolver: urlResolver,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearch = handleSubmit(async ({ image }) => {
    const searched = value.find((item) => item.url === "image");

    if (searched) {
      return searched.text;
    }

    setIsLoading(true);
    try {
      const { data } = await generateAPIClient.imageToText(image);

      onChange([{ url: image, text: data.text }, ...value]);
    } finally {
      setIsLoading(false);
    }
  });

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return onSearch();
    }
  };

  return (
    <div>
      <Controller
        control={control}
        name="image"
        render={({ field, fieldState }) => (
          <CInput
            {...field}
            className="bg-[#f6f8ff] dark:bg-[#131624]"
            placeholder="https://i.imgur.com/h9vHggg.png"
            error={fieldState.error}
            onKeyDown={handleKeyDown}
            prepend={
              <span className="flex gap-x-2 pl-3 text-gray-500">
                <LinkIcon width={18} /> Image URL
              </span>
            }
            append={
              field.value && (
                <span
                  className="cursor-pointer mx-3 border-[1px] border-gray-300 text-gray-700 px-3 bg-white rounded text-sm"
                  onClick={onSearch}
                >
                  Add Image
                </span>
              )
            }
          />
        )}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 false">
        {value.map((item) => (
          <div
            key={item.url}
            className="dark:bg-[#131624] bg-gray-200 rounded-md overflow-hidden cursor-pointer select-none"
          >
            <CCopy text={item.text}>
              <div>
                <div className="w-full aspect-square overflow-hidden flex items-center bg-gray-200 dark:bg-gray-800">
                  <img
                    className="object-cover w-full"
                    src={item.url}
                    alt={""}
                  />
                </div>
                <div className="py-1 px-2 text-sm text-gray-500">
                  {item.text}
                </div>
              </div>
            </CCopy>
          </div>
        ))}
      </div>
    </div>
  );
};
