import { IconButton, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { Post } from '../../api/post';
import { useDeleteLikeMutation, usePostLikeMutation } from '../../queries/likes';
import { useCurrentUser } from '../../stores/userStore';

export interface LikeButtonProps {
  post: Post;
}

export default function LikeButton({ post }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const user = useCurrentUser();
  const [userLikeId, setUserLikeId] = useState<string | undefined>(undefined);
  const postLike = { postId: post.id };
  const [liked, setLiked] = useState(false);
  const mutationPost = usePostLikeMutation();
  const mutationDelete = useDeleteLikeMutation(userLikeId ?? '');

  const handleLike = () => {
    mutationPost.mutate(postLike);
    setLikes(likes + 1);
    setLiked(true);
  };

  const handleDislike = () => {
    mutationDelete.mutate();
    setLikes(likes - 1);
    setLiked(false);
  };

  useEffect(() => {
    const userLike = post.likes.find((e) => e.userId === user.id);
    const id = userLike?.id;
    setUserLikeId(id);
    setLikes(post.likes.length);
    setLiked(!!userLike);
  }, [post]);

  return (
    <>
      {liked ? (
        <Tooltip hasArrow label="Unlike">
          <IconButton
            isLoading={mutationDelete.isLoading || mutationPost.isLoading}
            onClick={handleDislike}
            size="sm"
            aria-label="Dislike"
            icon={<FcLike />}
            fontSize="16"
          />
        </Tooltip>
      ) : (
        <Tooltip hasArrow label="Like">
          <IconButton
            isLoading={mutationDelete.isLoading || mutationPost.isLoading}
            onClick={handleLike}
            size="sm"
            aria-label="Like"
            icon={<FcLikePlaceholder />}
            fontSize="16"
          />
        </Tooltip>
      )}
      <Text>{likes}</Text>
    </>
  );
}
