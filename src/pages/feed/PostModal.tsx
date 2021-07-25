import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
  Textarea,
  Icon,
  WrapItem,
  Image,
  IconButton,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FcCancel } from 'react-icons/fc';
import { HiHashtag } from 'react-icons/hi';
import { RiImageAddLine } from 'react-icons/ri';
import { PostPost } from '../../api/post';
import { usePostMutation } from '../../queries/posts';
import { useImagePicker } from '../../utils/useImagePicker';

export interface PostModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps): JSX.Element {
  const form = useForm<PostPost>();
  const mutation = usePostMutation();
  const postImagePicker = useImagePicker();
  const toast = useToast();

  useEffect(() => {
    return form.setValue('postImageBlob', postImagePicker.base64Data ? postImagePicker.base64Data : '');
  }, [postImagePicker.base64Data]);

  const onSubmit = form.handleSubmit(async (postPost) => {
    await mutation.mutateAsync(postPost);
    postImagePicker.clear();
    form.reset();
    onClose();
    toast({
      title: 'Post was successfully created.',
      description: 'Your post was posted.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  });

  return (
    <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Create a new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start" spacing="10">
              <FormControl isRequired isInvalid={!!form.formState.errors.title}>
                <FormLabel>Title</FormLabel>
                <Textarea
                  {...form.register('title', { required: true, minLength: 1, maxLength: 100 })}
                  minH="unset"
                  overflow="hidden"
                  w="100%"
                  resize="none"
                  placeholder="Please enter the posts' title here"
                />
                <FormErrorMessage>The Title must be between 0-100 characters. Please try again.</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!form.formState.errors.content}>
                <FormLabel>Content</FormLabel>
                <VStack align="flex-start">
                  <Textarea
                    placeholder="You can enter the posts' content here"
                    {...form.register('content', { required: true, minLength: 10 })}
                  />
                  <FormErrorMessage>The Content must have at least 10 characters. Please try again.</FormErrorMessage>
                </VStack>
              </FormControl>
              <FormControl isRequired isInvalid={!!form.formState.errors.category}>
                <FormLabel>Assign a category</FormLabel>
                <WrapItem>
                  <VStack align="flex-start">
                    <HStack>
                      <Icon aria-label="hashtag" as={HiHashtag} />
                      <Textarea
                        {...form.register('category', {
                          required: true,
                          minLength: 1,
                          maxLength: 30,
                          pattern: /^(\d|\w+)$/,
                        })}
                        minH="unset"
                        overflow="hidden"
                        w="100%"
                        resize="none"
                        placeholder="eg. University, Lifestyle etc."
                        maxWidth="sm"
                      />
                    </HStack>
                    <FormErrorMessage>Category has to be one word only without special characters.</FormErrorMessage>
                  </VStack>
                </WrapItem>
              </FormControl>
              <FormControl>
                {!postImagePicker.src ? (
                  <>
                    <HStack justifyContent="space-between">
                      <FormLabel>Post Picture</FormLabel>
                    </HStack>
                    <IconButton
                      onClick={postImagePicker.pickImage}
                      size="lg"
                      aria-label="AddPicture"
                      icon={<RiImageAddLine />}
                    />
                  </>
                ) : (
                  <>
                    <HStack marginBottom="5" justifyContent="space-between">
                      <FormLabel>Post Picture</FormLabel>
                      <IconButton
                        onClick={postImagePicker.clear}
                        size="xs"
                        aria-label="DeletePicture"
                        icon={<FcCancel />}
                      />
                    </HStack>
                    <Image src={postImagePicker.src ? postImagePicker.src : ''} />
                  </>
                )}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" isLoading={mutation.isLoading}>
              Create
            </Button>
            <Button isLoading={mutation.isLoading} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
