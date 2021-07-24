import { useFilePicker } from 'use-file-picker';

/**
 * A hook which leverages {@link useFilePicker} to easily allow selecting
 * image files in a format understood by our backend (i.e. Base64).
 * Also returns the image in a format that can be rendered by browsers.
 * @returns Data about the picked image and functions to control/reset the flow.
 */
export function useImagePicker() {
  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    maxFileSize: 12,
  });

  // Unforunately useFilePicker only returns a data URL format.
  // This leverages Base64 though, so we can just remove the excess info
  // and end up with the raw Base64.
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
