import { Image, ImageProps } from '@chakra-ui/react';

export interface BlobImageProps extends Omit<ImageProps, 'src'> {
  blobId?: string;
}

export default function BlobImage({ blobId, ...rest }: BlobImageProps) {
  const blobUrl = blobId ? `${API_BASE_URL}/api/v1/blob/${blobId}` : undefined;
  return <Image src={blobUrl} {...rest} />;
}
