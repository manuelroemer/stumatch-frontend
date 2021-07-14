import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ContactRequestPost } from '../../api/contactRequest';
import DefaultPageLayout from '../../components/DefaultPageLayout';
import { usePostContactRequestMutation } from '../../queries/contactRequest';
import { useUserStore } from '../../stores/userStore';
import { getFullName } from '../../utils/userUtils';

export default function ContactPage() {
  const user = useUserStore((state) => state.userInfo?.user);
  const toast = useToast();
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ContactRequestPost>({
    defaultValues: {
      name: user ? getFullName(user) : undefined,
      email: user?.email,
    },
  });

  const mutation = usePostContactRequestMutation();
  const onSubmit = handleSubmit(async (contactRequestPost) => {
    await mutation.mutateAsync(contactRequestPost);
    reset();
    unregister('name');
    unregister('email');
    unregister('type');
    unregister('message');

    toast({
      title: 'Request sent successfully.',
      description: "We've sent your request.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  });

  return (
    <DefaultPageLayout header="Contact Us" subHeader="Please fill out the form and we'll get back to you right away!">
      <form onSubmit={onSubmit}>
        <VStack align="flex-start" spacing="5" maxW="4xl">
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              {...register('name', { required: true })}
              placeholder="Name"
              defaultValue={user ? getFullName(user) : undefined}
            />
            <FormErrorMessage>Please enter your name.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>E-Mail</FormLabel>
            <Input
              {...register('email', { required: true, maxLength: 320, pattern: /^\S+@\S+/ })}
              placeholder="Your E-Mail Address"
              type="email"
              defaultValue={user?.email}
            />
            <FormErrorMessage>Please enter a valid E-Mail address.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.type} isRequired>
            <FormLabel>What can we help you with?</FormLabel>
            <Select variant="filled" placeholder="Category" {...register('type', { required: true })}>
              <option value="role">Change Role</option>
              <option value="featureBug">Feature and Bug Report</option>
              <option value="other"> Other </option>
            </Select>
            <FormErrorMessage>Please select a category.</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.message} isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea rows={8} {...register('message', { required: true })} />
            <FormErrorMessage>Please enter your message.</FormErrorMessage>
          </FormControl>
          <Flex w="100%" justify="flex-end">
            <Button colorScheme="primary" type="submit" isLoading={mutation.isLoading}>
              Submit
            </Button>
          </Flex>
        </VStack>
      </form>
    </DefaultPageLayout>
  );
}
