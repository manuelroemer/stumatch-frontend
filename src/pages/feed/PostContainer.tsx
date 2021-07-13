import { Post } from '../../api/post';
import { Heading, Text, Flex, HStack } from '@chakra-ui/layout';
import { AiOutlineClockCircle, AiOutlinePicture } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { Grid, GridItem, Icon, Link } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { routes } from '../../constants';
import { useHistory } from 'react-router';
import { Dispatch } from 'react';
import SharePopOver from './SharePopOver';
import LikeButton from './LikeButton';

export interface PostContainerProps {
  post: Post;
  setPageFilter: Dispatch<string>;
}

export default function PostContainer({ post, setPageFilter }: PostContainerProps) {
  const history = useHistory();
  const handleClick = () => history.push(`${routes.feed}/${post.id}`);

  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(14, 1fr)" gap={2}>
      <GridItem rowSpan={2} colSpan={2}>
        <Flex h="100%" align="center">
          <Icon aria-lable="Picture" as={AiOutlinePicture} w="80%" h="80%" />
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={12}>
        <Flex h="100%" align="flex-end">
          <Heading onClick={handleClick} as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            <Link>{post.title}</Link>
          </Heading>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={11}>
        <HStack h="100%" justifyContent="space-between">
          <HStack>
            <Icon aria-lable="Author" as={CgProfile} />
            <Text>
              {post.author.lastName}, {post.author.firstName}
            </Text>
          </HStack>
          <HStack>
            <Icon aria-lable="Ago" as={AiOutlineClockCircle} />
            <ReactTimeago date={post.createdOn} component={(props) => <Text {...props} />} />
          </HStack>
          <HStack>
            <Icon aria-label="Category" as={HiHashtag} />
            <Link onClick={() => setPageFilter(post.category)}>{post.category}</Link>
          </HStack>
          <HStack>
            <LikeButton post={post}></LikeButton>
          </HStack>
          <HStack>
            <Icon size="sm" aria-label="Comment" as={BiCommentDetail} />
            <Text>{post.comments.length}</Text>
          </HStack>
          <HStack>
            <SharePopOver permalink={window.location.href + '/' + post.id} />
            <Text>Share</Text>
          </HStack>
        </HStack>
      </GridItem>
    </Grid>
  );
}
