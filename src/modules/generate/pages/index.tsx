import { Controller, useForm } from "react-hook-form";
import { IMGeneratePageProps } from "../type";
import { CUpload } from "src/common/components/controls/CUpload";
import { useMutation } from "src/common/hooks/mutation.hook";
import { imageAPIClient } from "src/apis/image/client";
import { CButton, CSpinner } from "src/common/components/others";
import { generateAPIClient } from "src/apis/generate/client";
import { classNames } from "src/utils/class-names";
import { promptResolver } from "../validate";
import { useCopyToClipboard } from "src/common/hooks";

export const MGeneratePage = ({ value, onChange }: IMGeneratePageProps) => {
  const { isLoading, mutation } = useMutation(
    async (image: File): Promise<string | undefined> => {
      try {
        const {
          data: { url },
        } = await imageAPIClient.upload(image);

        const {
          data: { text },
        } = await generateAPIClient.imageToText(url);

        return text;
      } catch (err) {
        console.log(err);
      }
    }
  );

  const { control, handleSubmit } = useForm({
    defaultValues: { image: undefined },
    resolver: promptResolver,
  });

  const { copy } = useCopyToClipboard(value);

  const onSubmit = handleSubmit(async ({ image }) => {
    const data = await mutation(image);

    data && onChange(data);
  });

  return (
    <div className="flex gap-x-8">
      <div className="w-1/3">
        <div className="max-w-[350px] mx-auto">
          <div className="relative">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <CUpload disabled={isLoading} id="file-upload" {...field} />
              )}
            />
            {isLoading && (
              <div className="absolute w-full h-full bg-gray-900 top-0 left-0 bg-opacity-20 flex justify-center items-center cursor-wait">
                <CSpinner />
              </div>
            )}
          </div>
          <div className="mt-4 px-6">
            <CButton
              className={classNames(
                "w-full justify-center",
                "dark:bg-gray-500 bg-gray-600 dark:text-gray-200 text-white",
                "border border-gray-300 dark:border-gray-600 flex items-center gap-1 rounded-md min-w-fit cursor-pointer drop-shadow"
              )}
              onClick={onSubmit}
            >
              Generate Prompt
            </CButton>
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col gap-y-4">
        <label htmlFor="output">Predicted prompt:</label>

        <div
          className={classNames(
            "px-2 py-1",
            "border rounded p-4 border-gray-300 select-none bg-[#FFFFFF] text-gray-500 dark:text-gray-300 dark:bg-gray-700 dark:border-[#131621]"
          )}
        >
          <pre className="min-h-[75px]" role="textbox">
            {value}
          </pre>
        </div>

        <CButton
          className={classNames(
            "w-[50%] max-w-[350px] justify-center",
            "dark:bg-gray-500 bg-gray-600 dark:text-gray-200 text-white border border-gray-300 dark:border-gray-600 ",
            "flex items-center gap-1 rounded-md min-w-fit cursor-pointer drop-shadow"
          )}
          onClick={copy}
        >
          Try Prompt
        </CButton>
      </div>
    </div>
  );
};
