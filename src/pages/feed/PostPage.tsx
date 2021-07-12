import { useGetPostByIDQuery } from '../../queries/posts';
import { HStack, Text, Heading, Flex, Box, IconButton, Icon } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { FcLikePlaceholder } from 'react-icons/fc';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import ReactTimeago from 'react-timeago';
import SharePopOver from './SharePopOver';

interface RouteParams {
  postId: string;
}

export default function PostPage() {
  const { postId } = useParams<RouteParams>();
  const { isLoading, data } = useGetPostByIDQuery(postId);

  return (
    <>
      {isLoading ? (
        <> </>
      ) : (
        <Flex as="main" px="8" py="4" justify="center" my="8">
          <Box w={['95%', '90%', '80%', '75%']}>
            <Flex justify="space-between">
              <Box as="header">
                <Heading as="h1" mb="0">
                  {data?.result.title}
                </Heading>
              </Box>
            </Flex>
            <Box as="article" mt={['4', '4', '8']}>
              {data?.result.content}
            </Box>
            <Box as="article" mt={['4', '4', '8']} rounded="md" boxShadow="base" p="6">
              <HStack h="100%" justifyContent="space-between">
                <HStack>
                  <Icon aria-lable="Author" as={CgProfile} />
                  <Text>
                    {data?.result.author.firstName}, {data?.result.author.lastName}
                  </Text>
                </HStack>
                <HStack>
                  <Icon aria-lable="Ago" as={AiOutlineClockCircle} />
                  <ReactTimeago
                    date={!data?.result.createdOn ? '' : data?.result.createdOn}
                    component={(props) => <Text {...props} />}
                  />
                </HStack>
                <HStack>
                  <Icon aria-label="Category" as={HiHashtag} />
                  <Text>{data?.result.category}</Text>
                </HStack>
                <HStack>
                  <IconButton size="sm" aria-label="Like" icon={<FcLikePlaceholder />} />
                  <Text>{data?.result.likes}</Text>
                </HStack>
                <HStack>
                  <IconButton size="sm" aria-label="Comment" icon={<BiCommentDetail />} />
                  <Text>{data?.result.comments}</Text>
                </HStack>
                <HStack>
                  <SharePopOver permalink={window.location.href} />
                  <Text>Share</Text>
                </HStack>
              </HStack>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
}
