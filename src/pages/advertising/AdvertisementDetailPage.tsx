import { HStack, Text, Heading, Flex, Box, Icon, useColorModeValue, Image } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import ReactTimeago from 'react-timeago';
import SharePopOver from '../feed/SharePopOver';
import { useGetAdvertisementByIDQuery } from '../../queries/advertisements';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdSubject } from 'react-icons/md';
import { getTargetGroup } from '../../utils/advertisementUtils';
import { defaultTimeagoFormatter } from '../../utils/reactTimeagoFormatter';
import { generatePermalinkForCurrentPage } from '../../utils/permalink';
import { tryGetBlobUrl } from '../../api/blob';
import PlaceHodlerPostPicture from '../../assets/sTUMatch_logo.png';
import { getFullName } from '../../utils/userUtils';

interface RouteParams {
  advertisementId: string;
}

function getTimeSpan(startDate: string, endDate: string) {
  return new Date(startDate).toLocaleDateString() + ' - ' + new Date(endDate).toLocaleDateString();
}

export default function AdvertisementDetailPage() {
  const { advertisementId } = useParams<RouteParams>();
  const { isLoading, data } = useGetAdvertisementByIDQuery(advertisementId);
  const colorBg = useColorModeValue('white', 'gray.700');
  const colorBd = useColorModeValue('gray.200', 'gray.600');

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
                src={tryGetBlobUrl(data.result.advertisementImageBlobId)}
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
            <Box as="article" mt={['4', '4', '8']}>
              <Text whiteSpace="pre-line">{data.result.content}</Text>
            </Box>
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
                  <Icon aria-label="TimeSpan" as={IoCalendarOutline} />
                  <Text>{getTimeSpan(data.result.startDate, data.result.endDate)}</Text>
                </HStack>
                <HStack>
                  <Icon aria-label="Faculty" as={MdSubject} />
                  <Text>{getTargetGroup(data.result)}</Text>
                </HStack>
                <HStack>
                  <SharePopOver permalink={generatePermalinkForCurrentPage()} />
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
