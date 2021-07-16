import { Box, Image, HStack, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react';
import RequireRoles from '../components/RequireRoles';
import { routes } from '../constants';
import NavBarItem from './NavBarItem';
import NavBarNotificationItem from './NavBarNotificationItem';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { RiContactsLine } from 'react-icons/ri';
import NavBarProfileItem from './NavBarProfileItem';
import NavBarChatItem from './NavBarChatItem';
import NavBarIconButton from './NavBarIconButton';
import { FiSun } from 'react-icons/fi';
import { FaMoon } from 'react-icons/fA';

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const colorBg = useColorModeValue('white', 'gray.700');
  const colorBd = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex
      as="nav"
      borderBottom="1px"
      borderColor={colorBd}
      bg={colorBg}
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
        <NavBarIconButton
          aria-label="colorMode"
          showIndicator={false}
          variant="ghost"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <FaMoon color="gray" size="18" /> : <FiSun size="18" />}>
          {colorMode === 'light' ? 'Dark' : 'Light'}
        </NavBarIconButton>
        <Link to={routes.friendsList}>
          <NavBarIconButton aria-label="My Friends" icon={<RiContactsLine size="18" />} showIndicator={false} />
        </Link>
        <NavBarChatItem />
        <NavBarNotificationItem />
        <NavBarProfileItem />
      </HStack>
    </Flex>
  );
}
