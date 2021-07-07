import { Post } from '../../api/post';
import { Heading, Text, Flex } from '@chakra-ui/layout';
import { FcLikePlaceholder } from 'react-icons/fc';
import { AiOutlineClockCircle, AiOutlineShareAlt, AiOutlinePicture } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { HiHashtag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { Grid, GridItem, IconButton, Icon } from '@chakra-ui/react';
import React from 'react';

export interface PostContainerProps {
  post: Post;
}

export default function PostContainer({ post }: PostContainerProps) {
  return (
    <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(14, 1fr)" gap={2}>
      <GridItem rowSpan={2} colSpan={2}>
        <Flex h="100%" align="center">
          <Icon aria-label="Picture" as={AiOutlinePicture} w="80%" h="80%" margin="5" />
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={12}>
        <Flex h="100%" align="center">
          <Heading as="h1" lineHeight="1.4" fontSize="20" isTruncated textAlign="left">
            {post.title}
          </Heading>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Flex h="100%" align="center">
          <IconButton marginRight="5" size="sm" aria-label="Like" icon={<FcLikePlaceholder />} />
          <Text textAlign="left">{post.likes}</Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Flex h="100%" align="center">
          <IconButton marginRight="5" size="sm" aria-label="Comment" icon={<BiCommentDetail />} />
          <Text>{post.comments}</Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Flex h="100%" align="center">
          <IconButton marginRight="5" size="sm" aria-label="Categories" icon={<HiHashtag />} />
          <Text textAlign="left">{post.categories}</Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Flex h="100%" align="center">
          <Icon aria-label="Author" as={CgProfile} marginRight="5" />
          <Text textAlign="left">
            {post.author.lastName}, {post.author.firstName}
          </Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Flex h="100%" align="center">
          <Icon aria-label="Ago" as={AiOutlineClockCircle} marginRight="5" />
          <Text textAlign="left">{post.createdOn}</Text>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Flex h="100%" align="center" justify="center">
          <Text marginRight="5" textAlign="left">
            Share
          </Text>
          <IconButton size="sm" aria-label="Share" icon={<AiOutlineShareAlt />} />
        </Flex>
      </GridItem>
    </Grid>
  );
}
