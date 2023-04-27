import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { CInput } from "src/common/components/controls";
import { CButton } from "src/common/components/others";
import { classNames } from "src/utils/class-names";
import { IMBlogSearchProps } from "./type";
import { useEffect } from "react";
import { useToggle, useDimension, useDebounce } from "src/common/hooks";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const MBlogSearch = ({ title, onSearch }: IMBlogSearchProps) => {
  const { isOpen, toggle, close } = useToggle();

  const dimension = useDimension();

  useEffect(() => {
    close();
  }, [dimension.width]);

  const onChange = useDebounce((e: any) => onSearch(e.target.value), 400);

  return (
    <>
      <div className="flex items-start">
        <h1
          className={classNames(
            comfortaa.className,
            "flex-1 text-2xl font-bold leading-9 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14",
            "text-gray-900 dark:text-gray-100"
          )}
        >
          {title}
        </h1>
        <div>
          <CInput
            defaultValue={""}
            onChange={onChange}
            aria-label="Search articles"
            type="text"
            className={classNames(
              "hidden sm:flex items-center border rounded px-2",
              "border-gray-300 dark:border-gray-600 text-gray-500 dark:bg-[#131624] bg-[#F6F8FF] dark:text-white"
            )}
            placeholder="Search articles"
            append={
              <div className="flex items-center gap-1 text-gray-500 select-none cursor-text">
                <MagnifyingGlassIcon width={18} />
              </div>
            }
          />

          <div
            className={classNames(
              "cursor-pointer sm:hidden flex p-2 border text-gray-500 rounded",
              "border-gray-300 dark:border-gray-600"
            )}
            onClick={toggle}
          >
            <MagnifyingGlassIcon width={18} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="pt-2">
          <label
            className={classNames(
              "sm:hidden flex items-center border rounded py-1 px-2",
              "border-gray-300 dark:border-gray-600 text-gray-500 dark:bg-[#131624] bg-[#F6F8FF]"
            )}
          >
            <CInput
              defaultValue={""}
              onChange={onChange}
              className="px-2 py-0 flex-1 dark:bg-[#131624] bg-[#F6F8FF] dark:text-white text-black dark:placeholder-gray-700 border-none focus:outline-none focus:ring-0"
              placeholder="Search articles"
              prepend={
                <div className="flex items-center gap-1 text-gray-500 select-none cursor-text">
                  <MagnifyingGlassIcon width={18} />
                </div>
              }
              append={
                <div className="flex items-center gap-1 text-gray-500 select-none cursor-text">
                  <CButton className="px-1">
                    <XCircleIcon width={18} />
                  </CButton>
                </div>
              }
            />
          </label>
        </div>
      )}
    </>
  );
};
