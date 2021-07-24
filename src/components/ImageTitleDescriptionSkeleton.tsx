import { Grid, HTMLChakraProps, LayoutProps, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';

type Size = LayoutProps['width'];

export interface ImageTitleDescriptionSkeletonProps extends HTMLChakraProps<'div'> {
  imageSize?: Size;
  textSize?: Size;
  imageTextSpacing?: Size;
  textSpacing?: Size;
}

/**
 * A loading skeleton which resembles a structure with an image to the left,
 * a title and text below the title.
 * Used by various components, e.g. the notifications.
 */
export default function ImageTitleDescriptionSkeleton({
  imageSize = 14,
  textSize = 5,
  imageTextSpacing = 4,
  textSpacing = 2,
  ...rest
}: ImageTitleDescriptionSkeletonProps) {
  return (
    <Grid templateColumns="auto 1fr" {...rest}>
      <SkeletonCircle w={imageSize} h={imageSize} />
      <VStack spacing={textSpacing} ml={imageTextSpacing} justify="center">
        <Skeleton h={textSize} w="100%" />
        <Skeleton h={textSize} w="100%" />
      </VStack>
    </Grid>
  );
}
