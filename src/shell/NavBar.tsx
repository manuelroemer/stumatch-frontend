import { Box, chakra, HStack, Flex, Button, Text } from '@chakra-ui/react';
import RequireRoles from '../components/RequireRoles';
import { routes } from '../constants';
import { useCurrentUser, useUserStore } from '../stores/userStore';
import NavBarItem from './NavBarItem';
import NavBarNotificationItem from './NavBarNotificationItem';
import logo from '../assets/logo.svg';

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
        <chakra.img src={logo} height="8" alt="sTUMatch Logo" />
      </Box>
      <HStack grow={2} w="100%" mx="16" spacing="8">
        <NavBarItem title="Feed" to={routes.feed} />
        <RequireRoles roles={['admin', 'student']}>
          <NavBarItem title="Matching" to={routes.matching} />
        </RequireRoles>
        <RequireRoles roles={['admin', 'advertiser']}>
          <NavBarItem title="Advertising" to={routes.advertising} />
        </RequireRoles>
        <RequireRoles roles="admin">
          <NavBarItem title="Administration" to={routes.administration} />
        </RequireRoles>
      </HStack>
      <HStack spacing="4">
        <NavBarNotificationItem />
        <Text w="10rem" noOfLines={1}>
          Hello {user.firstName} {user.lastName}!
        </Text>
        <Button onClick={logout}>Logout</Button>
      </HStack>
    </Flex>
  );
}
