import { Box, IconButton, IconButtonProps } from '@chakra-ui/react';

export interface NavBarIconButtonProps extends IconButtonProps {
  showIndicator: boolean;
}

export default function NavBarIconButton({ showIndicator, ...rest }: NavBarIconButtonProps) {
  return (
    <Box pos="relative">
      <IconButton variant="ghost" {...rest} />
      {showIndicator && <Box rounded="full" bg="primary.500" w="2" h="2" position="absolute" top="1.5" right="1.5" />}
    </Box>
  );
}
