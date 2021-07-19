import { HStack, Text, Heading, Flex, Box, Icon, Divider, Textarea, VStack, Button, Center } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { HiHashtag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import ReactTimeago from 'react-timeago';
import SharePopOver from '../feed/SharePopOver';
import { usePageQueryParameter } from '../../utils/useQueryParameter';
import { useGetAdvertisementByIDQuery } from '../../queries/advertisements';

interface RouteParams {
  advertisementId: string;
}

export default function AdvertisementPage() {
  const { advertisementId } = useParams<RouteParams>();
  const { isLoading, data } = useGetAdvertisementByIDQuery(advertisementId);
  const [page, setPage] = usePageQueryParameter();

  return (
    <>
      {isLoading && <>{/* TODO: Loading animation. */}</>}
      {data && data.result && (
        <Flex as="main" px="8" py="4" justify="center" my="8">
          <Box w={['95%', '90%', '80%', '75%']}>
            <Flex justify="space-between">
              <Box as="header">
                <Heading as="h1" mb="0">
                  {data.result.title}
                </Heading>
              </Box>
            </Flex>
            <Box as="article" mt={['4', '4', '8']}>
              {data.result.content}
            </Box>
            <Box as="article" mt={['4', '4', '8']} rounded="md" boxShadow="base" p="6">
              <HStack h="100%" justifyContent="space-between">
                <HStack>
                  <Icon aria-label="Author" as={CgProfile} />
                  <Text>
                    {data.result.author.firstName}, {data.result.author.lastName}
                  </Text>
                </HStack>
                <HStack>
                  <Icon aria-label="Ago" as={AiOutlineClockCircle} />
                  <ReactTimeago
                    date={!data.result.createdOn ? '' : data.result.createdOn}
                    component={(props) => <Text {...props} />}
                  />
                </HStack>
                <HStack>
                  <Icon aria-label="Faculty" as={HiHashtag} />
                  <Text>{data.result.facultyId}</Text>
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
