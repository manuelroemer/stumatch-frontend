import React from 'react';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useFilePicker } from 'use-file-picker';

export interface ImagePickerProps {
  children?: ReactNode;
  onImageSelected(base64Data: string): void;
}

export default function ImagePicker({ children, onImageSelected }: ImagePickerProps) {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    maxFileSize: 12,
  });
  const base64 = filesContent.length > 0 ? dataUrlToBase64(filesContent[0].content) : undefined;

  const select = () => {
    if (!loading) {
      openFileSelector();
    }
  };

  useEffect(() => {
    if (!loading && base64) {
      onImageSelected(base64);
    }
  }, [loading, base64]);

  const childProps = {
    src: filesContent[0]?.content,
    onClick: select,
    cursor: 'pointer',
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, childProps) : child,
      )}
    </>
  );
}

function dataUrlToBase64(dataUrl: string) {
  const start = dataUrl.indexOf(',');
  return dataUrl.substr(start + 1);
}
