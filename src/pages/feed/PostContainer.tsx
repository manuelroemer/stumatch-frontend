import { Post } from '../../api/post';
import { Heading, Text, Flex, HStack } from '@chakra-ui/layout';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { HiHashtag } from 'react-icons/hi';
import { Image, Grid, GridItem, Icon, Link } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { routes } from '../../constants';
import { useHistory } from 'react-router';
import SharePopOver from './SharePopOver';
import LikeButton from './LikeButton';
import { tryGetBlobUrl } from '../../api/blob';
import PlaceHodlerPostPicture from '../../assets/sTUMatch_logo.png';
import { Dispatch } from 'react';

export interface PostContainerProps {
  post: Post;
  setPageFilter: Dispatch<string>;
}

export default function PostContainer({ post, setPageFilter }: PostContainerProps) {
  const history = useHistory();
  const handleClick = () => history.push(`${routes.feed}/${post.id}`);

  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(13, 1fr)" gap={2} rowGap="6">
      <GridItem rowSpan={2} colSpan={2}>
        <Flex h="100%" justify="center">
          <Image
            boxSize="100px"
            objectFit="cover"
            alt="postImage"
            src={tryGetBlobUrl(post?.postImageBlobId)}
            fallbackSrc={PlaceHodlerPostPicture}
          />
        </Flex>
      </GridItem>

      <GridItem rowSpan={1} colSpan={10}>
        <Flex h="100%" align="flex-end">
          <Heading onClick={handleClick} as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            <Link>{post.title}</Link>
          </Heading>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <HStack>
          <Icon aria-label="Author" as={CgProfile} />
          <Text>
            {post.author.lastName}, {post.author.firstName}
          </Text>
        </HStack>
      </GridItem>
      <GridItem colSpan={2}>
        <HStack>
          <Icon aria-label="Ago" as={AiOutlineClockCircle} />
          <ReactTimeago date={post.createdOn} component={(props) => <Text {...props} />} />
        </HStack>
      </GridItem>
      <GridItem colSubmit Commentpan={3}>
        <HStack>
          <Icon aria-label="Category" as={HiHashtag} />
          <Link onClick={() => setPageFilter(post.category)}>{post.category}</Link>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack>
          <LikeButton post={post}></LikeButton>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack>
          <Icon w={4} h={4} aria-label="Comment" as={BiCommentDetail} />
          <Text>{post.comments.length}</Text>
        </HStack>
      </GridItem>
      <GridItem colStart={13}>
        <HStack>
          <SharePopOver permalink={window.location.href + '/' + post.id} />
          <Text>Share</Text>
        </HStack>
      </GridItem>
    </Grid>
  );
}
