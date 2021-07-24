import { Heading, Text, Flex, HStack } from '@chakra-ui/layout';
import { AiOutlineClockCircle, AiOutlinePicture } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Badge, Center, Grid, GridItem, Icon, Link } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { routes } from '../../constants';
import { useHistory } from 'react-router';
import { Advertisement } from '../../api/advertisement';
import SharePopOver from '../feed/SharePopOver';
import { getTargetGroup } from '../../utils/advertisementUtils';
import { MdSubject } from 'react-icons/md';

export interface AdvertisementContainerProps {
  advertisement: Advertisement;
}

export default function AdvertisementContainer({ advertisement }: AdvertisementContainerProps) {
  const history = useHistory();
  const handleClick = () => history.push(`${routes.advertising}/${advertisement.id}`);

  return (
    <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(13, 1fr)" gap={2}>
      <GridItem rowSpan={3} colSpan={2}>
        <Center h="100%" align="center">
          <Icon aria-label="Picture" as={AiOutlinePicture} w="80%" h="80%" />
        </Center>
      </GridItem>
      <GridItem rowSpan={1} colSpan={11}>
        <HStack h="100%" align="flex-end" >
          <Heading onClick={handleClick} as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            <Link>{advertisement.title}</Link>
          </Heading>
        </HStack>
      </GridItem>
      <GridItem rowSpan={1} colSpan={11}>
        <Flex h="100%" align="center">
          <Text>{advertisement.shortDescription}</Text>
        </Flex>
      </GridItem>

      <GridItem colSpan={3}>
        <Badge variant="solid" colorScheme="cyan">
          <HStack>
            <Icon aria-label="Author" as={CgProfile} fontSize="14" />
            <Text fontSize="12">
              {advertisement.author.lastName} ,{advertisement.author.firstName}
            </Text>
          </HStack>
        </Badge>
      </GridItem>
      <GridItem colSpan={2}>
        {getTargetGroup(advertisement) && (
          <Badge variant="solid" colorScheme="cyan">
            <HStack>
              <Icon aria-label="TargetGroup" as={MdSubject} fontSize="14" />
              <Text fontSize="12">{getTargetGroup(advertisement)}</Text>
            </HStack>
          </Badge>
        )}
      </GridItem>
      <GridItem colSpan={2}>
        <Badge variant="solid" colorScheme="cyan">
          <HStack>
            <Icon aria-label="Ago" as={AiOutlineClockCircle} fontSize="14" />
            <ReactTimeago date={advertisement.createdOn} component={(props) => <Text fontSize="12" {...props} />} />
          </HStack>
        </Badge>
      </GridItem>
      <GridItem colStart={13} colspan={1}>
        <HStack>
          <SharePopOver permalink={window.location.href + '/' + advertisement.id} />
          <Text>Share</Text>
        </HStack>
      </GridItem>
    </Grid>
  );
}
