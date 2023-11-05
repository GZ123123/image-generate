import { Button } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { imageAPIClient } from 'src/apis/image/client';

const ALLOW_IMAGE_EXT: string[] = ['jpeg', 'jpg', 'png'];

export interface IMImageSelectorProps {
  maxFileSize?: number;
  label?: string;
  value?: string;
  defaultUrl?: string;
  onChange?: (value: string) => void;
}

export const MImageSelector = ({ maxFileSize, label, value, defaultUrl, onChange }: IMImageSelectorProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultUrl);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const chooseImage = () => {
    inputFileRef.current?.click();
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();

    if (!fileExt) {
      toast.error('Image is required');
      return;
    }

    if (!ALLOW_IMAGE_EXT.includes(fileExt)) {
      toast.error(`Allowed Extensions are ${ALLOW_IMAGE_EXT.join(', ')}`);
      return;
    }

    if ((file.size / 1024 / 1024) > (maxFileSize ?? 2)) {
      toast.error(`Image size exceeds ${(maxFileSize ?? 2)} MiB`);
      return;
    }
    
    try {
      setIsUploading(true);

      const response = await imageAPIClient.mediaUpload(file);

      setPreviewUrl(response.data.url ?? URL.createObjectURL(file));
      console.log(response);
      onChange && onChange(response.data._id);
    } catch (error) {
      toast.error('Someting error');
    } finally {
      setIsUploading(false);
    }

    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div>
      {label && <p className="capitalize">{label}</p>}
      <Button variant="outlined" disabled={isUploading} onClick={chooseImage}>
        {isUploading ? 'Please wait...' : 'Choose image'}
      </Button>
      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={previewUrl} alt="Image" className="max-w-full h-auto w-52 rounded mt-2" />
      )}
      <input ref={inputFileRef} type="file" style={{ display: 'none' }} onChange={onFileChange} />
    </div>
  )
};