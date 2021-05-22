import { Box, chakra, HStack, Flex, Button, Text } from '@chakra-ui/react';
import { routes } from '../constants';
import { useCurrentUser, useUserStore } from '../stores/userStore';
import NavBarItem from './NavBarItem';

export default function NavBar() {
  const logout = useUserStore((state) => state.logout);
  const user = useCurrentUser();

  return (
    <Flex
      as="nav"
      borderBottom="1px"
      borderColor="gray.200"
      shadow="sm"
      px="8"
      py="4"
      align="center"
      justify="space-between">
      <Box>
        <chakra.img src="../../assets/logo.png" height="8" alt="sTUMatch Logo" />
      </Box>
      <HStack grow={2} w="100%" mx="16" spacing="8">
        <NavBarItem title="Feed" to={routes.feed} />
        <NavBarItem title="Matching" to={routes.matching} />
      </HStack>
      <HStack spacing="4">
        <Text>Hello {user.displayName}!</Text>
        <Button onClick={logout}>Logout</Button>
      </HStack>
    </Flex>
  );
}
