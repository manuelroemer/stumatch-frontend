import { Heading, Flex } from '@chakra-ui/react';
import { Box, Stack } from '@chakra-ui/layout';
import logo from '../../assets/logo.png';
import LoginBox from './LoginBox';

export default function LandingPage() {
  return (
    <Flex minH="100vh" justify="space-between" align="center" direction="row" wrap="nowrap" px="10%">
      <Stack w="60%">
        <img src={logo} alt="sTUMatch Logo" width="70%" />
        <Heading as="h2" size="md" mt="8" color="primary" opacity="0.8" fontWeight="normal" lineHeight={1.5}>
          Meet other students, get notified about events at your university and build long-lasting relationships - all
          in one location.
        </Heading>
      </Stack>
      <Box>
        <LoginBox />
      </Box>
    </Flex>
  );
}
