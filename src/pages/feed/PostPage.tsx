import { useGetPostByIDQuery } from '../../queries/posts';
import {
  HStack,
  Text,
  Heading,
  Flex,
  Box,
  Icon,
  Image,
  Divider,
  Textarea,
  VStack,
  Button,
  Center,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import ReactTimeago from 'react-timeago';
import SharePopOver from './SharePopOver';
import LikeButton from './LikeButton';
import CommentContainer from './CommentContainer';
import { useState } from 'react';
import { useGetCommentsQuery, usePostCommentMutation } from '../../queries/comments';
import { usePageQueryParameter } from '../../utils/useQueryParameter';
import Pagination from '../../components/Pagination';
import { NoCommentsEmptyState } from '../../components/EmptyStates';
import { tryGetBlobUrl } from '../../api/blob';
import PlaceHodlerPostPicture from '../../assets/sTUMatch_logo.png';
import { defaultTimeagoFormatter } from '../../utils/reactTimeagoFormatter';
import { generatePermalinkForCurrentPage } from '../../utils/permalink';
import { getFullName } from '../../utils/userUtils';

interface RouteParams {
  postId: string;
}

export default function PostPage() {
  const { postId } = useParams<RouteParams>();
  const { isLoading, data } = useGetPostByIDQuery(postId);
  const [commentContent, setCommentContent] = useState('');
  const mutationPost = usePostCommentMutation(postId);
  const [page, setPage] = usePageQueryParameter();
  const { data: commentData } = useGetCommentsQuery(postId, {
    page,
    pageSize: 10,
    sort: 'createdOn:desc',
  });
  const colorBg = useColorModeValue('white', 'gray.700');
  const colorBd = useColorModeValue('gray.200', 'gray.600');
  const toast = useToast();

  const handleSubmit = () => {
    mutationPost.mutate({ content: commentContent });
    setCommentContent('');
    toast({
      title: 'Comment was successfully created.',
      description: 'Your comment was created.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      {isLoading && <>{/* TODO: Loading animation. */}</>}
      {data && data.result && (
        <Flex as="main" px="8" py="4" justify="center" my="8">
          <Box w={['95%', '90%', '80%', '75%']}>
            <Flex w="100%" rounded="md" justify="center">
              <Image
                maxBlockSize="150px"
                objectFit="cover"
                alt="postImage"
                src={tryGetBlobUrl(data.result.postImageBlobId)}
                fallbackSrc={PlaceHodlerPostPicture}
              />
            </Flex>
            <Flex justify="space-between">
              <Box as="header">
                <Heading as="h1" mb="0">
                  {data.result.title}
                </Heading>
              </Box>
            </Flex>
            <VStack>
              <Box as="article" mt={['4', '4', '8']}>
                <p style={{ whiteSpace: 'pre-wrap' }}>{data.result.content}</p>
              </Box>
            </VStack>
            <Box
              as="article"
              mt={['4', '4', '8']}
              rounded="md"
              boxShadow="base"
              p="6"
              bg={colorBg}
              borderColor={colorBd}>
              <HStack h="100%" justifyContent="space-between">
                <HStack>
                  <Icon aria-label="Author" as={CgProfile} />
                  <Text>{getFullName(data.result.author)}</Text>
                </HStack>
                <HStack>
                  <Icon aria-label="Ago" as={AiOutlineClockCircle} />
                  <ReactTimeago
                    formatter={defaultTimeagoFormatter}
                    date={!data.result.createdOn ? '' : data.result.createdOn}
                    component={(props) => <Text {...props} />}
                  />
                </HStack>
                <HStack>
                  <Icon aria-label="Category" as={HiHashtag} />
                  <Text>{data.result.category}</Text>
                </HStack>
                <HStack>
                  <LikeButton post={data.result}></LikeButton>
                </HStack>
                <HStack>
                  <Icon aria-label="Comment" as={BiCommentDetail} />
                  <Text>{data.result.comments.length}</Text>
                </HStack>
                <HStack>
                  <SharePopOver permalink={generatePermalinkForCurrentPage()} />
                  <Text>Share</Text>
                </HStack>
              </HStack>
            </Box>
            <Box
              as="article"
              mt={['4', '4', '8']}
              rounded="md"
              boxShadow="base"
              p="6"
              bg={colorBg}
              borderColor={colorBd}>
              <VStack>
                <Flex w="100%" alignContent="flex-start">
                  <Heading as="h1" size="md" mb="0">
                    Comments
                  </Heading>
                </Flex>
                <Divider />
                <Textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Type your comment here..."
                  size="md"
                />
                <Flex w="100%" justifyContent="flex-end">
                  <Button onClick={handleSubmit} colorScheme="blue">
                    Submit comment
                  </Button>
                </Flex>
              </VStack>
              {commentData?.result.map((comment) => (
                <CommentContainer key={comment.id} comment={comment} />
              ))}
              {commentData && commentData.result.length > 0 && (
                <Center mt="10">
                  <Pagination currentPage={commentData.page} pages={commentData.pages} onPageChanged={setPage} />
                </Center>
              )}
              {commentData && commentData.result.length === 0 && <NoCommentsEmptyState />}
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
}
