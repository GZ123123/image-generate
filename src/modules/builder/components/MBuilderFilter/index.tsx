/* eslint-disable @next/next/no-img-element */

import { CInput } from "src/common/components/controls";
import { IMBuilderFilterProps } from "./type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CButton } from "src/common/components/others";
import Image from "next/image";
import useSWR from "swr";
import { categoryAPIClient } from "src/apis/category/client";
import { useMemo, useState } from "react";
import { imageAPIClient } from "src/apis/image/client";
import { useDebounce } from "src/common/hooks";
import { classNames } from "src/utils/class-names";
import { IImageResponse } from "src/apis/image/types";

export const MBuilderFilter = ({ value, onChange }: IMBuilderFilterProps) => {
  const [q, setQ] = useState<string | null>();

  const [category, setCategory] = useState<string | null>();

  const { data: categories } = useSWR("categories", () =>
    categoryAPIClient.get().then((res) => res.data)
  );

  const { data } = useSWR(
    () => {
      if (q) {
        return ["images", "q", q];
      } else if (categories?.length) {
        return ["images", "category", category ?? categories[0]._id];
      }

      return null;
    },
    () => {
      return imageAPIClient
        .get({ category_id: category as string, q: q as string })
        .then((res) => res.data);
    }
  );

  const selected = useMemo(() => {
    return value.map((v) => v._id);
  }, [value]);

  const images = useMemo(() => {
    return category === "__selected__" ? value : data;
  }, [value, data, category]);

  const onSearch = (v: any) => {
    setCategory(null);
    setQ(v.target.value);
  };

  const onFilter = useDebounce((v: string) => {
    setQ(null);
    setCategory(v);
  }, 200);

  const onSelect = (image: IImageResponse) => {
    if (!selected.includes(image._id)) {
      onChange([...value, image]);
    } else {
      onChange(value.filter(({ _id }) => _id !== image._id));
    }
  };

  const onSelectedClick = () => {
    setCategory("__selected__");
  };

  return (
    <div className="p-4">
      <div>
        <CInput
          value={q}
          onChange={onSearch}
          className="bg-[#f6f8ff] dark:bg-[#131624]"
          placeholder="Search Keyword..."
          prepend={<MagnifyingGlassIcon className="ml-2" width={16} />}
        />
      </div>
      <div className="flex mt-4 gap-2 text-sm flex-nowrap sm:flex-wrap overflow-scroll scrollbar-hide select-none">
        <CButton
          onClick={onSelectedClick}
          className={classNames(
            category == "__selected__"
              ? " dark:bg-gray-500 bg-gray-600 dark:text-gray-900 text-white"
              : "dark:bg-[#131624] bg-gray-200 dark:text-gray-400 text-gray-500 hover:text-[#DB0B36] dark:hover:text-[#DB0B36]",
            "border border-gray-300 dark:border-gray-600 flex items-center gap-1  px-2 py-1 rounded-md min-w-fit cursor-pointer drop-shadow"
          )}
        >
          Selected ({value.length})
        </CButton>
        {categories?.map(({ _id, name }) => (
          <CButton
            key={_id}
            onClick={() => onFilter(_id)}
            className={classNames(
              _id === category
                ? " dark:bg-gray-500 bg-gray-600 dark:text-gray-900 text-white"
                : "dark:bg-[#131624] bg-gray-200 dark:text-gray-400 text-gray-500 hover:text-[#DB0B36] dark:hover:text-[#DB0B36]",
              "border border-gray-300 dark:border-gray-600 flex items-center gap-1  px-2 py-1 rounded-md min-w-fit cursor-pointer drop-shadow"
            )}
          >
            {name}
          </CButton>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images?.map((image) => (
          <div
            key={image._id}
            className={classNames(
              "group",
              selected.includes(image._id)
                ? "bg-[#DB0A35] rounded-md overflow-hidden cursor-pointer select-none selected"
                : "dark:bg-[#131624] bg-gray-200 rounded-md overflow-hidden cursor-pointer select-none"
            )}
            onClick={() => onSelect(image)}
          >
            <div>
              <div className="w-full aspect-square overflow-hidden flex items-center bg-gray-200 dark:bg-gray-800">
                <img
                  src={image.url as string}
                  alt={image.name || ""}
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </div>
            <div
              className={classNames(
                "py-1 px-2 text-sm capitalize",
                selected.includes(image._id) ? "text-white" : "text-gray-500"
              )}
            >
              {image.key}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
