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
  Flex,
  HStack,
  Textarea,
  Icon,
  WrapItem,
  Tooltip,
  Text,
  LinkBox,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiHashtag } from 'react-icons/hi';
import { PostPost } from '../../api/post';
import { usePostMutation } from '../../queries/posts';
import { useDropzone } from 'react-dropzone';
export interface PostModalProps {
  isOpen: boolean;
  onClose(): void;
}

export default function PostModal({ isOpen, onClose }: PostModalProps): JSX.Element {
  const [validCategory, setValidCategory] = useState(true);
  const form = useForm<PostPost>();
  const mutation = usePostMutation();

  const onSubmit = form.handleSubmit(async (postPost) => {
    // Hier, Bild dem Poost zuweisen
    // form.setValue('image', acceptedFileItems[0])
    mutation.mutate(postPost);
  });

  // Filedropdown
  function Accept() {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: 'image/jpeg, image/png',
      maxFiles: 1,
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
      <Text key={file.path}>
        {file.path} - {file.size} bytes
      </Text>
    ));

    return (
      <VStack w="100%">
        <HStack w="100%">
          <FormControl isRequired>
            <FormLabel>Image</FormLabel>
            <Link w="100%">
              <LinkBox as="article" p="5" borderWidth="1px" rounded="md" w="100%" borderStyle="dashed">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <Flex w="100%" justifyContent="center">
                    <p>Drag and drop some files here, or click to select files. </p>
                    <em>(Only one *.jpeg or *.png image will be accepted)</em>
                  </Flex>
                </div>
              </LinkBox>
            </Link>
          </FormControl>
        </HStack>
        <HStack w="100%">
          <Flex w="100%" justifyContent="flex-start">
            {acceptedFileItems.length > 0 ? (
              <>
                <FormLabel>Accepted file</FormLabel>
                <Text> {acceptedFileItems}</Text>
              </>
            ) : (
              <></>
            )}
          </Flex>
        </HStack>
      </VStack>
    );
  }

  return (
    <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Create a new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="flex-start" spacing="10">
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
                      <Icon aria-label="hashtag" as={HiHashtag} />
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
              <Accept />
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
