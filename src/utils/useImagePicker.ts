import { useFilePicker } from 'use-file-picker';

export function useImagePicker() {
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    maxFileSize: 12,
  });
  const base64Data = filesContent.length > 0 ? dataUrlToBase64(filesContent[0].content) : undefined;

  const pickImage = () => {
    if (!loading) {
      openFileSelector();
    }
  };

  return {
    src: filesContent[0]?.content,
    base64Data,
    pickImage,
    loading,
    clear,
  };
}

function dataUrlToBase64(dataUrl: string) {
  const start = dataUrl.indexOf(',');
  return dataUrl.substr(start + 1);
}
