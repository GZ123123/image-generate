import { useMemo } from "react";
import { IMBuilderOutputProps } from "./types";
import { classNames } from "src/utils/class-names";

export const MBuilderOutput = ({
  texts,
  filters,
  images,
  params,
}: IMBuilderOutputProps) => {
  const output = useMemo(() => {
    return [texts.join(", "), filters.join(", "), images.join(", ")]
      .filter(Boolean)
      .join(", ");
  }, [texts, filters, images, params]);

  return (
    <div>
      <div className="pt-1 h-11 pb-3 px-4 text-lg text-gray-400  flex gap-2 items-center">
        Title
      </div>
      <div
        className={classNames(
          "border rounded p-4 mb-4",
          "border-gray-300 select-none bg-[#FFFFFF] text-gray-500",
          "dark:bg-gray-900 dark:border-[#131621]"
        )}
      >
        <label id="output">/imagine prompt: {output}</label>
      </div>
    </div>
  );
};
