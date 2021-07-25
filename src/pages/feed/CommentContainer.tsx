import { Box, ButtonGroup, Flex, HStack, Icon, IconButton, Text, VStack, Textarea, useToast } from '@chakra-ui/react';
import { AiOutlineClockCircle, AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import { RiEditBoxLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import ReactTimeago from 'react-timeago';
import { Comment } from '../../api/comment';
import { useGetUserQuery } from '../../queries/users';
import { useState } from 'react';
import { useCurrentUser } from '../../stores/userStore';
import { useDeleteCommentMutation, usePutCommentMutation } from '../../queries/comments';

export interface CommentContainerProps {
  comment: Comment;
}

export default function CommentContainer({ comment }: CommentContainerProps) {
  const { data: user } = useGetUserQuery(comment.authorId);
  const currentUser = useCurrentUser();
  const [editable, setEditable] = useState(false);
  const [currentContent, setCurrentContent] = useState('');
  const mutationDelete = useDeleteCommentMutation(comment.id);
  const mutationPut = usePutCommentMutation(comment.id);
  const toast = useToast();
  const handleCheck = () => {
    mutationPut.mutate({ content: currentContent });
    setEditable(false);
    toast({
      title: 'Comment was successfully edited.',
      description: 'Your comment was refreshed.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };
  const handleEdit = () => {
    setCurrentContent(comment.content);
    setEditable(true);
  };

  function allowEdit() {
    return currentUser.id == comment.authorId || currentUser.roles.includes('admin') ? true : false;
  }

  function generalInfo() {
    return (
      <Flex w="100%" justifyContent="flex-start">
        <HStack>
          <HStack spacing="5">
            <HStack>
              <Icon aria-label="Ago" as={AiOutlineClockCircle} />
              <ReactTimeago date={comment.createdOn} component={(props) => <Text {...props} />} />
            </HStack>
            {comment.createdOn != comment.modifiedOn ? (
              <HStack>
                <Icon aria-label="EditAgo" as={BsPencil} />
                <ReactTimeago date={comment.modifiedOn} component={(props) => <Text {...props} />} />
              </HStack>
            ) : (
              <></>
            )}
          </HStack>
        </HStack>
      </Flex>
    );
  }

  return (
    <Box as="article" mt={['4', '4', '4']} rounded="md" boxShadow="base" p="3">
      <VStack alignContent="flex-start" spacing="5">
        <HStack w="100%">
          <Icon aria-label="Author" as={CgProfile} />
          <Text>
            <b>
              {user?.result.firstName}, {user?.result.lastName} said:
            </b>
          </Text>
        </HStack>
        {allowEdit() ? (
          editable ? (
            <>
              <Flex w="100%" justifyContent="flex-start">
                <HStack w="100%">
                  <Textarea onChange={(e: any) => setCurrentContent(e.target.value)} value={currentContent} />
                </HStack>
              </Flex>
              <HStack w="100%" justifyContent="space-between">
                Ì{generalInfo()}
                <Flex justifyContent="flex-end" size="sm">
                  <ButtonGroup justifyContent="flex-end" size="sm">
                    <IconButton onClick={handleCheck} size="sm" aria-label="Check" icon={<FcCheckmark />} />
                    <IconButton onClick={() => setEditable(false)} size="sm" aria-label="Close" icon={<FcCancel />} />
                  </ButtonGroup>
                </Flex>
              </HStack>
            </>
          ) : (
            <>
              <Flex w="100%" justifyContent="flex-start">
                <HStack>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</p>
                </HStack>
              </Flex>
              <HStack w="100%" justifyContent="space-between">
                {generalInfo()}
                <Flex justifyContent="flex-end" size="sm">
                  <ButtonGroup justifyContent="flex-end" size="sm">
                    <IconButton onClick={handleEdit} size="sm" aria-label="Edit" icon={<RiEditBoxLine />} />
                    <IconButton
                      size="sm"
                      onClick={() => {
                        mutationDelete.mutate();
                        toast({
                          title: 'Comment was successfully deleted.',
                          description: 'Your comment was deleted.',
                          status: 'success',
                          duration: 9000,
                          isClosable: true,
                        });
                      }}
                      aria-label="Delete"
                      icon={<AiOutlineDelete />}
                    />
                  </ButtonGroup>
                </Flex>
              </HStack>
            </>
          )
        ) : (
          <>
            <Flex w="100%" justifyContent="flex-start">
              <HStack>
                <p style={{ whiteSpace: 'pre-wrap' }}>{comment.content}</p>
              </HStack>
            </Flex>
            {generalInfo()}
          </>
        )}
      </VStack>
    </Box>
  );
}
