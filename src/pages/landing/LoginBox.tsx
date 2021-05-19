import { Input } from '@chakra-ui/input';
import { Button, Divider } from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/layout';

export default function LoginBox() {
  return (
    <Box maxW="sm" p="4" borderRadius="lg" borderWidth="1px" boxShadow="xl">
      <Heading as="h1" size="lg" mb="4">
        Login
      </Heading>
      <Input placeholder="Your E-Mail Address" mb="2" autoFocus />
      <Input placeholder="Your Password" type="password" mb="3" />
      <Button w="100%" colorScheme="blue">Login</Button>

      <Divider my="6" />

      <Heading as="h1" size="md" mb="4">New to sTUMatch?</Heading>
      <Button w="100%" colorScheme="green">Create an account</Button>
    </Box>
  );
}
