import React, { forwardRef, useEffect, useRef, useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { ICEditor } from "./types";
import { uploadPlugin } from "./function";

const CEditorInner = (
  { id, label, onChange, name, value }: ICEditor,
  ref: React.ForwardedRef<any>
) => {
  const editorRef = useRef<any>(null);

  const { CKEditor } = editorRef.current || {};
  const [isLoaded, setLoaded] = useState(false);

  const handleChange = (_: any, editor: any) => {
    onChange(editor.getData());
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
    };

    setLoaded(true);
  }, []);

  return (
    <div>
      {label && (
        <label className="capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      {isLoaded ? (
        <CKEditor
          id={id}
          ref={ref}
          name={name}
          config={{
            extraPlugins: [uploadPlugin],
          }}
          editor={Editor}
          data={value}
          onChange={handleChange}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
};

export const CEditor = forwardRef(CEditorInner);
