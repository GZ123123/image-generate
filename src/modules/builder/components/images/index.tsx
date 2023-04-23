import { CInput } from "src/common/components/controls";
import { IMBuilderImageProps } from "./types";
import { LinkIcon } from "@heroicons/react/24/outline";

export const MBuilderImage = ({ onChange }: IMBuilderImageProps) => {
  return (
    <div className="p-4">
      <CInput
        className="bg-[#F6F8FF]"
        prepend={
          <span className="flex gap-x-2 pl-3">
            <LinkIcon width={18} /> Image URL
          </span>
        }
        append={
          <span className="cursor-pointer mx-3 border-[1px] border-gray-300 text-gray-700 px-3 bg-white rounded text-sm">
            Add Image
          </span>
        }
      />
    </div>
  );
};
