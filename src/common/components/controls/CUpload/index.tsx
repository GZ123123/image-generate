import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { ICUploadProps } from "./types";
import { classNames } from "src/utils/class-names";

export const CUpload = forwardRef<
  HTMLInputElement,
  ICUploadProps<HTMLInputElement>
>(({ id, value, onChange, className, ...props }, ref) => {
  const labelRef = useRef(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    onChange(file);
  };

  useLayoutEffect(() => {
    const ele = document.getElementById(id);

    if (!boxRef.current) {
      return;
    }

    const box = boxRef.current;

    box.classList.add("has-advanced-upload");

    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop",
    ].forEach(function (event) {
      box.addEventListener(event, function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    ["dragover", "dragenter"].forEach(function (event) {
      box.addEventListener(event, function () {
        box.classList.add("is-dragover");
      });
    });
    ["dragleave", "dragend", "drop"].forEach(function (event) {
      box.addEventListener(event, function () {
        box.classList.remove("is-dragover");
      });
    });
    box.addEventListener("drop", (e: any) => {
      console.log(typeof e);
      const file = e.dataTransfer.files[0];
      onChange(file);
    });
  }, []);

  useEffect(() => {
    let background: string;

    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      background = `background-image: url(${url})`;
    } else if (value) {
      background = `background-image: url(${value})`;
    } else {
      background = "";
    }

    if (labelRef.current) {
      (labelRef.current as HTMLElement).setAttribute("style", background);
    }
  }, [value]);

  return (
    <div
      ref={boxRef}
      className="max-w-[350px] w-full aspect-square bg-white p-3"
    >
      <input
        id={id}
        ref={ref}
        type="file"
        className={classNames(className, "hidden")}
        onChange={handleFileUpload}
        accept="image/*"
        {...props}
      />
      <label
        ref={labelRef}
        htmlFor={id}
        className="block cursor-pointer w-full h-full bg-slate-200 bg-contain bg-no-repeat bg-center"
      >
        <span className="sr-only">File Input</span>
        {!value && (
          <div className="w-full h-full text-black flex justify-center items-center text-center">
            Drag and drop an image image here.
          </div>
        )}
      </label>
    </div>
  );
});
