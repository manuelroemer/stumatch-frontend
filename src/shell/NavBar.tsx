import { Box, Image, HStack, Flex, Icon } from '@chakra-ui/react';
import RequireRoles from '../components/RequireRoles';
import { routes } from '../constants';
import NavBarItem from './NavBarItem';
import NavBarNotificationItem from './NavBarNotificationItem';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { HiOutlineUserGroup } from 'react-icons/hi';
import NavBarProfileItem from './NavBarProfileItem';

export default function NavBar() {
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
        <Image src={logo} height="8" alt="sTUMatch Logo" />
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
        <Link to={routes.chat}>
          <Icon as={IoChatbubblesOutline} />
        </Link>
        <Link to={routes.friendsList}>
          <Icon as={HiOutlineUserGroup} />
        </Link>
        <NavBarNotificationItem />
        <NavBarProfileItem />
      </HStack>
    </Flex>
  );
}
