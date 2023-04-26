import { useMemo } from "react";
import { IMBuilderOutputProps } from "./types";
import { classNames } from "src/utils/class-names";
import { CButton } from "src/common/components/others";

export const MBuilderOutput = ({
  texts,
  filters,
  images,
  params,
  onReset,
}: IMBuilderOutputProps) => {
  const includeText = useMemo(() => {
    return texts
      .filter((text) => text.value && !text.exclude)
      .map((text) =>
        [text.value, text.multiPrompt || text.weight ? "::" : "", text.weight]
          .filter(Boolean)
          .join("")
      );
  }, [texts]);

  const exculdeText = useMemo(() => {
    return texts
      .filter((text) => text.value && text.exclude)
      .map((text) => text.value)
      .join(", ");
  }, [texts]);

  const includeFilder = useMemo(() => {
    return filters.map((filter) => filter.key);
  }, [filters]);

  const includeParams = useMemo(() => {
    return Object.keys(params)
      .map((key: any) => {
        const value = params[key];

        if (!value) return "";

        switch (typeof value) {
          case "boolean":
            return value ? key : "";
          default:
            return `${key} ${value}`;
        }
      })
      .filter(Boolean);
  }, [params]);

  const output = useMemo(() => {
    const prefix = [
      includeText.join(" "),
      includeFilder.join(", "),
      images.join(", "),
      includeParams.join(" "),
    ]
      .filter(Boolean)
      .join(", ");

    return `${prefix} ${exculdeText.length ? `--no ${exculdeText}` : ""}`;
  }, [includeText, exculdeText, filters, images, params]);

  const onCopy = () => {
    navigator.clipboard.writeText(output.trim());
  };

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

        <div className="flex items-center mt-2">
          <div className="flex-1 ">
            <div
              className="relative inline-block text-left select-none"
              data-headlessui-state=""
            >
              <div>
                <CButton
                  type="button"
                  className="rounded py-1 px-3 dark:bg-gray-800 bg-gray-300 dark:hover:text-white hover:text-black"
                  onClick={onReset}
                >
                  reset
                </CButton>
              </div>
            </div>
          </div>
          <CButton
            className="rounded py-1 px-3 bg-magenta text-white flex items-center justify-center gap-2"
            onClick={onCopy}
          >
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>{" "}
            COPY
          </CButton>
        </div>
      </div>
    </div>
  );
};
