/* eslint-disable @next/next/no-img-element */
import { LinkIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";

import { CInput } from "src/common/components/controls";

import { IMBuilderImageProps } from "./types";

import { urlResolver } from "./validate";
import Image from "next/image";

export const MBuilderImage = ({ value, onChange }: IMBuilderImageProps) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { image: "" },
    resolver: urlResolver,
  });

  const onSearch = handleSubmit(({ image }) => {
    onChange(value.concat(image));
    reset({ image: "" });
  });

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return onSearch();
    }
  };

  return (
    <div className="p-4">
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
        {value.map((image) => (
          <div
            key={image}
            className="dark:bg-[#131624] bg-gray-200 rounded-md overflow-hidden cursor-pointer select-none"
          >
            <div>
              <div className="w-full aspect-square overflow-hidden flex items-center bg-gray-200 dark:bg-gray-800">
                <Image
                  className="object-cover w-full"
                  src={image}
                  alt={""}
                  width={200}
                  height={200}
                />
              </div>
              <div className="py-1 px-2 text-sm text-gray-500">{image}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
