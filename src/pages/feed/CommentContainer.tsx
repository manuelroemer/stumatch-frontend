import { Box, Grid, GridItem, HStack, Icon, Text } from '@chakra-ui/react';
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
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(20, 1fr)" gap={4}>
        <GridItem rowSpan={1} colSpan={20}>
          <Text>{comment.content}</Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={20}>
          <HStack spacing="5">
            <HStack>
              <Icon aria-lable="Author" as={CgProfile} />
              <Text>
                {user?.result.lastName}, {user?.result.firstName}
              </Text>
            </HStack>
            <HStack>
              <Icon aria-lable="Ago" as={AiOutlineClockCircle} />
              <ReactTimeago date={comment.createdOn} component={(props) => <Text {...props} />} />
            </HStack>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}
