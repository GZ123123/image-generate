import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ICEditor } from "./types";

const CEditorInner = (
  { id, label, onChange, name, value }: ICEditor,
  ref: React.ForwardedRef<any>
) => {
  const editorRef = useRef<any>(null);

  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [isLoaded, setLoaded] = useState(false);

  const handleChange = (_: any, editor: any) => {
    onChange(editor.getData());
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
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
          ref={ref}
          id={id}
          name={name}
          editor={ClassicEditor}
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
