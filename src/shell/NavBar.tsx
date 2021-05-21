import { Box, chakra, HStack, Flex, Button } from '@chakra-ui/react';
import { routes } from '../constants';
import { useUserStore } from '../stores/userStore';
import NavBarItem from './NavBarItem';

export default function NavBar() {
  const logout = useUserStore((state) => state.logout);

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
        <Button onClick={logout}>Logout</Button>
      </HStack>
    </Flex>
  );
}
