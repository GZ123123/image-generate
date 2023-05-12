import { imageAPIClient } from "src/apis/image/client";

function uploadAdapter(loader: any) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        loader.file.then(async (file: any) => {
          try {
            const res = await imageAPIClient.upload(file);

            if (res?.data?.url) {
              return resolve({
                default: res?.data?.url,
              });
            }
          } catch (err) {
            reject(err);
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
