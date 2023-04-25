import { CInput } from "src/common/components/controls";
import { IMBuilderFilterProps } from "./type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CButton } from "src/common/components/others";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { ICategoryResponse } from "src/apis/category/types";
import { IImageResponse } from "src/apis/image/types";

export const MBuilderFilter = ({ value, onChange }: IMBuilderFilterProps) => {
  const { control, handleSubmit } = useForm();

  const categories: ICategoryResponse[] = [];

  const images: IImageResponse[] = [];

  const onSubmit = handleSubmit((v) => {
    console.log(v);
  });

  return (
    <div className="p-4">
      <div>
        <CInput
          value={""}
          onChange={(v) => console.log(v)}
          prepend={<MagnifyingGlassIcon className="ml-2" width={16} />}
        />
      </div>
      <div className="flex mt-4 gap-2 text-sm flex-nowrap sm:flex-wrap overflow-scroll scrollbar-hide select-none">
        <CButton>Selected ({value.length})</CButton>
        {categories?.map(({ _id, name }) => (
          <CButton key={_id} onChange={onSubmit}>
            {name}
          </CButton>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images?.map((image) => (
          <div
            key={image._id}
            className="dark:bg-[#131624] bg-gray-200 rounded-md overflow-hidden cursor-pointer select-none"
          >
            <div>
              <div className="w-full aspect-square overflow-hidden flex items-center bg-gray-200 dark:bg-gray-800">
                <Image
                  src={image.url as string}
                  alt={image.name || ""}
                  width={100}
                  height={150}
                />
              </div>
            </div>
            <div className="py-1 px-2 text-sm text-gray-500">{image.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
