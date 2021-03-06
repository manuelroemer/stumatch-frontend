import { Post } from '../../api/post';
import { Heading, Text, Flex, HStack } from '@chakra-ui/layout';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { HiHashtag } from 'react-icons/hi';
import { Image, Grid, GridItem, Icon, Link, IconButton } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { routes } from '../../constants';
import { useHistory } from 'react-router';
import SharePopOver from './SharePopOver';
import LikeButton from './LikeButton';
import { tryGetBlobUrl } from '../../api/blob';
import PlaceHodlerPostPicture from '../../assets/sTUMatch_logo.png';
import { Dispatch } from 'react';
import { defaultTimeagoFormatter } from '../../utils/reactTimeagoFormatter';
import { generatePermalinkForCurrentPage } from '../../utils/permalink';
import { getFullName } from '../../utils/userUtils';

export interface PostContainerProps {
  post: Post;
  setPageFilter: Dispatch<string>;
}

export default function PostContainer({ post, setPageFilter }: PostContainerProps) {
  const history = useHistory();
  const goToPostDetails = () => history.push(`${routes.feed}/${post.id}`);

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
          <Heading onClick={goToPostDetails} as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            <Link>{post.title}</Link>
          </Heading>
        </Flex>
      </GridItem>
      <GridItem colSpan={3}>
        <HStack h="100%">
          <Icon aria-label="Author" as={CgProfile} />
          <Text>{getFullName(post.author)}</Text>
        </HStack>
      </GridItem>
      <GridItem colSpan={2}>
        <HStack h="100%">
          <Icon aria-label="Ago" as={AiOutlineClockCircle} />
          <ReactTimeago
            formatter={defaultTimeagoFormatter}
            date={post.createdOn}
            component={(props) => <Text {...props} />}
          />
        </HStack>
      </GridItem>
      <GridItem colSpan={3}>
        <HStack h="100%">
          <Icon aria-label="Category" as={HiHashtag} />
          <Link onClick={() => setPageFilter(post.category)}>{post.category}</Link>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack h="100%">
          <LikeButton post={post}></LikeButton>
        </HStack>
      </GridItem>
      <GridItem>
        <HStack h="100%">
          <IconButton
            size="sm"
            aria-label="Comment"
            icon={<BiCommentDetail />}
            fontSize="17"
            onClick={goToPostDetails}
          />
          <Text>{post.comments.length}</Text>
        </HStack>
      </GridItem>
      <GridItem colStart={13}>
        <HStack h="100%">
          <SharePopOver permalink={generatePermalinkForCurrentPage('/' + post.id)} />
          <Text>Share</Text>
        </HStack>
      </GridItem>
    </Grid>
  );
}
