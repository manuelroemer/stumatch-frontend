import { Box, Image, HStack, Flex, Icon, IconButton } from '@chakra-ui/react';
import RequireRoles from '../components/RequireRoles';
import { routes } from '../constants';
import NavBarItem from './NavBarItem';
import NavBarNotificationItem from './NavBarNotificationItem';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { RiContactsLine } from 'react-icons/ri';
import NavBarProfileItem from './NavBarProfileItem';
import NavBarChatItem from './NavBarChatItem';

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
        <Image src={logo} height="10" alt="sTUMatch Logo" />
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
      <HStack spacing="4" justify="center">
        <Link to={routes.friendsList}>
          <IconButton aria-label="friendslist" variant="ghost" icon={<RiContactsLine />} />
        </Link>
        <NavBarChatItem />
        <NavBarNotificationItem />
        <NavBarProfileItem />
      </HStack>
    </Flex>
  );
}
