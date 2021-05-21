import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/input';
import { Button, Divider, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Box, Heading } from '@chakra-ui/layout';
import { useState } from 'react';
import { useUserStore } from '../../stores/userStore';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginBox() {
  const [hasUnsucessfulLoginAttempt, setHasUnsucessfulLoginAttempt] = useState(false);
  const login = useUserStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const couldLogin = await login(email, password);
    if (!couldLogin) {
      setHasUnsucessfulLoginAttempt(true);
      setValue('password', '');
    }
  });

  return (
    <Box w="sm" p="4" borderRadius="lg" borderWidth="1px" boxShadow="xl">
      <Heading as="h1" size="lg" mb="4">
        Login
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl mb="2" isInvalid={!!errors.email}>
          <Input
            placeholder="Your E-Mail Address"
            autoFocus
            {...register('email', { required: true, maxLength: 320, pattern: /.+@.+/ })}
          />
          <FormErrorMessage>Please enter a valid E-Mail address.</FormErrorMessage>
        </FormControl>
        <FormControl mb="2" isInvalid={!!errors.password}>
          <Input placeholder="Your Password" type="password" {...register('password', { required: true })} />
          <FormErrorMessage>Please enter your password.</FormErrorMessage>
        </FormControl>
        <FormControl mb="3" isInvalid={hasUnsucessfulLoginAttempt}>
          <FormErrorMessage>Your E-Mail address or password was incorrect. Please try again.</FormErrorMessage>
        </FormControl>
        <Button w="100%" colorScheme="blue" type="submit">
          Login
        </Button>
      </form>

      <Divider my="6" />

      <Heading as="h1" size="md" mb="4">
        New to sTUMatch?
      </Heading>
      <Button w="100%" colorScheme="green">
        Create an account
      </Button>
    </Box>
  );
}
