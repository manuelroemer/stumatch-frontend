import { useForm } from 'react-hook-form';
import { Button, Divider, Input, FormControl, FormErrorMessage, Box, Heading, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useUserStore } from '../../stores/userStore';
import CreateAccountModal from './CreateAccountModal';
import { emailRegex } from '../../constants';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsucessfulLoginAttempt, setHasUnsucessfulLoginAttempt] = useState(false);
  const login = useUserStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setIsSubmitting(true);
    const couldLogin = await login(email, password);

    if (!couldLogin) {
      setIsSubmitting(false);
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
            {...register('email', { required: true, maxLength: 320, pattern: emailRegex })}
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
        <Button w="100%" colorScheme="primary" type="submit" isLoading={isSubmitting}>
          Login
        </Button>
      </form>

      <Divider my="6" />

      <Heading as="h1" size="md" mb="4">
        New to sTUMatch?
      </Heading>
      <Button w="100%" colorScheme="green" onClick={onOpen}>
        Create an account
      </Button>
      <CreateAccountModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
