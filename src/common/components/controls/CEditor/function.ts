import { imageAPIClient } from "src/apis/image/client";

function uploadAdapter(loader: any) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        loader.file.then(async (file: any) => {
          try {
            const res = await imageAPIClient.mediaUpload(file);

            if (res?.data?.url) {
              return resolve({
                default: res?.data?.url,
              });
            } else {
              reject('Empty url uploaded.');
            }
          } catch (err) {
            reject('Upload error.');
          }
        });
      });
    },
  };
}

export function uploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return uploadAdapter(loader);
  };
}
