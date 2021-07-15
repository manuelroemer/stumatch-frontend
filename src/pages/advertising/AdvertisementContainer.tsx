import { Heading, Text, Flex, HStack } from '@chakra-ui/layout';
import { AiOutlineClockCircle, AiOutlinePicture } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { Grid, GridItem, Icon, Link } from '@chakra-ui/react';
import ReactTimeago from 'react-timeago';
import { routes } from '../../constants';
import { useHistory } from 'react-router';
import { Advertisement } from '../../api/advertisement';
import SharePopOver from '../feed/SharePopOver';

export interface AdvertisementContainerProps {
  advertisement: Advertisement;
}

export default function AdvertisementContainer({ advertisement }: AdvertisementContainerProps) {
  const history = useHistory();
  const handleClick = () => history.push(`${routes.advertising}/${advertisement.id}`);

  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(14, 1fr)" gap={2}>
      <GridItem rowSpan={2} colSpan={2}>
        <Flex h="100%" align="center">
          <Icon aria-label="Picture" as={AiOutlinePicture} w="80%" h="80%" />
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={12}>
        <Flex h="100%" align="flex-end">
          <Heading onClick={handleClick} as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            <Link>{advertisement.title}</Link>
          </Heading>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={11}>
        <HStack h="100%" justifyContent="space-between">
          <HStack>
            <Icon aria-label="Author" as={CgProfile} />
            <Text>
              {advertisement.author.lastName}, {advertisement.author.firstName}
            </Text>
          </HStack>
          <HStack>
            <Icon aria-label="Ago" as={AiOutlineClockCircle} />
            <ReactTimeago date={advertisement.createdOn} component={(props) => <Text {...props} />} />
          </HStack>
          <HStack>
            <SharePopOver permalink={window.location.href + '/' + advertisement.id} />
            <Text>Share</Text>
          </HStack>
        </HStack>
      </GridItem>
    </Grid>
  );
}
