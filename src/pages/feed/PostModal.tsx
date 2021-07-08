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
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiHashtag } from 'react-icons/hi';
import { postPost } from '../../api/post';
import { usePostMutation } from '../../queries/posts';

export interface PostModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps): JSX.Element {
  const [validCategory, setValidCategory] = React.useState(true);
  const form = useForm<postPost>();
  const mutation = usePostMutation();

  const onSubmit = form.handleSubmit(async (postPost) => {
    mutation.mutate(postPost);
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
              {console.log('form' + form.getValues('title'))}
              {console.log('form' + form.getValues('content'))}
              {console.log('form' + form.getValues('authorId'))}

              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Textarea
                  onChange={(e: any) => {
                    form.setValue('title', e.target.value);
                  }}
                  minH="unset"
                  overflow="hidden"
                  w="100%"
                  resize="none"
                  placeholder="Please enter the posts' title here"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="You can enter the posts' content here"
                  onChange={(e: any) => {
                    form.setValue('content', e.target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Assign a category</FormLabel>
                <WrapItem>
                  <Tooltip
                    hasArrow
                    label="Category has to be one word only without special characters"
                    placement="left"
                    isOpen={!validCategory}
                    bg="red.600">
                    <HStack>
                      <Icon aria-lable="hashtag" as={HiHashtag} />
                      <Textarea
                        onChange={(e: any) => {
                          setValidCategory(/^(\d|\w+)$/.test(e.target.value));
                          form.setValue('category', e.target.value);
                        }}
                        isInvalid={!validCategory}
                        isRequired
                        minH="unset"
                        overflow="hidden"
                        w="100%"
                        resize="none"
                        placeholder="eg. University, Lifestyle etc."
                        maxWidth="sm"
                      />
                    </HStack>
                  </Tooltip>
                </WrapItem>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue" mr={3} type="submit" isLoading={mutation.isLoading}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
