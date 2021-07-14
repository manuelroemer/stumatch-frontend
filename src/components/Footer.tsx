import { Flex, VStack, HStack, Button, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { routes } from '../constants';
import { useUserStore } from '../stores/userStore';

export default function Footer() {
  const isLoggedIn = useUserStore((state) => !!state.userInfo);
  return (
    <Flex marginTop="auto" bg="gray.100" borderTop="1px" borderColor="gray.200" p="8">
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
            <Button colorScheme="primary" variant="link">
              Terms of Use
            </Button>
            <Button colorScheme="primary" variant="link">
              Privacy Policy
            </Button>
          </HStack>
        </VStack>
        <Text fontSize="sm" opacity="0.4">
          &copy; {new Date().getFullYear()} sTUMatch, Inc. All rights reserved.
        </Text>
      </VStack>
    </Flex>
  );
}
