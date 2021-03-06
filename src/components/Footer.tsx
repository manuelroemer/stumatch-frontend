import { Flex, VStack, HStack, Button, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { routes } from '../constants';
import { useUserStore } from '../stores/userStore';

/**
 * The application's footer.
 * Can be integrated into pages.
 *
 * Is not present in the app shell by default because some pages do not
 * look good with a footer.
 */
export default function Footer() {
  const isLoggedIn = useUserStore((state) => !!state.userInfo);
  const colorBg = useColorModeValue('gray.100', 'gray.700');
  const colorBd = useColorModeValue('gray.200', 'gray.600');

  return (
    <Flex marginTop="auto" bg={colorBg} borderTop="1px" borderColor={colorBd} p="8">
      <VStack align="center" w="100%" spacing="6">
        <Image src={logo} height="10" alt="sTUMatch Logo" mb="2" />
        <VStack spacing="2">
          <HStack spacing="4">
            {isLoggedIn ? (
              <Link to={routes.feed}>
                <Button colorScheme="primary" variant="link">
                  Feed
                </Button>
              </Link>
            ) : (
              <Link to={routes.root}>
                <Button colorScheme="primary" variant="link">
                  Home
                </Button>
              </Link>
            )}
            <Link to={routes.contact}>
              <Button colorScheme="primary" variant="link">
                Contact Us
              </Button>
            </Link>
          </HStack>
          <HStack spacing="4">
            <Link to={routes.termsOfUse}>
              <Button colorScheme="primary" variant="link">
                Terms and Conditions
              </Button>
            </Link>
            <Link to={routes.privacyPolicy}>
              <Button colorScheme="primary" variant="link">
                Privacy Policy
              </Button>
            </Link>
          </HStack>
        </VStack>
        <Text fontSize="sm" opacity="0.4">
          &copy; {new Date().getFullYear()} sTUMatch, Inc. All rights reserved.
        </Text>
      </VStack>
    </Flex>
  );
}
