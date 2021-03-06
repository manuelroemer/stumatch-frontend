import { Heading, Flex, Box, Stack } from '@chakra-ui/react';
import logo from '../../assets/logo.svg';
import Footer from '../../components/Footer';
import LoginBox from './LoginBox';

export default function LandingPage() {
  return (
    <Flex minH="100%" display="flex" flexDirection="column">
      <Flex mt="10%" justify="space-between" align="center" direction="row" wrap="nowrap" px="10%">
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
      <Footer />
    </Flex>
  );
}
