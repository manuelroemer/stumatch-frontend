import { Post } from '../../api/post';
import { Heading, Text, Flex, HStack } from '@chakra-ui/layout';
import { FcLikePlaceholder } from 'react-icons/fc';
import { AiOutlineClockCircle, AiOutlineShareAlt, AiOutlinePicture } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { Grid, GridItem, IconButton, Icon } from '@chakra-ui/react';
import React from 'react';
import ReactTimeago from 'react-timeago';

export interface PostContainerProps {
  post: Post;
}

export default function PostContainer({ post }: PostContainerProps) {
  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(14, 1fr)" gap={2}>
      <GridItem rowSpan={2} colSpan={2}>
        <Flex h="100%" align="center">
          <Icon aria-lable="Picture" as={AiOutlinePicture} w="80%" h="80%" />
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={12}>
        <Flex h="100%" align="flex-end">
          <Heading as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            {post.title}
          </Heading>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={11}>
        <HStack h="100%" justifyContent="space-between">
          <HStack>
            <IconButton size="sm" aria-label="Like" icon={<FcLikePlaceholder />} />
            <Text>{post.likes}</Text>
          </HStack>
          <HStack>
            <IconButton size="sm" aria-label="Comment" icon={<BiCommentDetail />} />
            <Text>{post.comments}</Text>
          </HStack>
          <HStack>
            <IconButton size="sm" aria-label="Category" icon={<HiHashtag />} />
            <Text>{post.category}</Text>
          </HStack>
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
            <IconButton size="sm" aria-label="Share" icon={<AiOutlineShareAlt />} />
            <Text>Share</Text>
          </HStack>
        </HStack>
      </GridItem>
    </Grid>
  );
}
