import { Box, Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import ReactTimeago from 'react-timeago';
import { Comment } from '../../api/comment';
import { useGetUserQuery } from '../../queries/users';

export interface CommentContainerProps {
  comment: Comment;
}

export default function CommentContainer({ comment }: CommentContainerProps) {
  const { data: user } = useGetUserQuery(comment.authorId);

  return (
    <Box as="article" mt={['4', '4', '4']} rounded="md" boxShadow="base" p="3">
      <VStack alignContent="flex-start" spacing="5">
        <Flex w="100%" justifyContent="flex-start">
          <HStack>
            <Text>{comment.content}</Text>
          </HStack>
        </Flex>
        <Flex w="100%" justifyContent="flex-start">
          <HStack>
            <HStack spacing="5">
              <HStack>
                <Icon aria-label="Author" as={CgProfile} />
                <Text>
                  {user?.result.lastName}, {user?.result.firstName}
                </Text>
              </HStack>
              <HStack>
                <Icon aria-label="Ago" as={AiOutlineClockCircle} />
                <ReactTimeago date={comment.createdOn} component={(props) => <Text {...props} />} />
              </HStack>
            </HStack>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
}
