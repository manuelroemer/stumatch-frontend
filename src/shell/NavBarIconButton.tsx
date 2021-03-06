import { Box, IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';

export interface NavBarIconButtonProps extends IconButtonProps {
  showIndicator: boolean;
}

/**
 * A generic component for an icon button within the navbar.
 * Can optionally show an indicator notifying the user about (new) changes.
 */
export default function NavBarIconButton({ showIndicator, ...rest }: NavBarIconButtonProps) {
  return (
    <Box pos="relative">
      <Tooltip label={rest['aria-label']} hasArrow>
        <Box>
          <IconButton variant="ghost" {...rest} />
          {showIndicator && (
            <Box rounded="full" bg="primary.500" w="2" h="2" position="absolute" top="1.5" right="1.5" />
          )}
        </Box>
      </Tooltip>
    </Box>
  );
}
