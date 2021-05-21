import { Box, Text } from '@chakra-ui/react';
import { Link, useRouteMatch } from 'react-router-dom';

export interface NavBarItemProps {
  title: string;
  to: string;
}

export default function NavBarItem({ title, to }: NavBarItemProps) {
  const isSelected = !!useRouteMatch(to);

  return (
    <Box>
      <Link to={to}>
        <Text
          fontWeight="semibold"
          color={isSelected ? 'primary.500' : undefined}
          opacity={isSelected ? 1.0 : 0.6}
          transition="all 250ms"
          _hover={{ opacity: 1.0 }}>
          {title}
        </Text>
      </Link>
    </Box>
  );
}
