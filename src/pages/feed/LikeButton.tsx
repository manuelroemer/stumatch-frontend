import { IconButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { Post } from '../../api/post';
import { useDeleteLikeMutation, usePostLikeMutation } from '../../queries/likes';
import { useCurrentUser } from '../../stores/userStore';

export interface LikeButtonProps {
  post?: Post;
}

export default function LikeButton({ post }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const user = useCurrentUser();
  const [userLikeId, setUserLikeId] = useState<string | undefined>(undefined);
  const postLike = { postId: post ? post.id : '' };
  const [liked, setLiked] = useState(false);
  const mutationPost = usePostLikeMutation();
  const mutationDelete = useDeleteLikeMutation(!userLikeId ? '' : userLikeId);

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
    if (post) {
      const userLikes = post.likes.filter((e) => e.userId == user.id);
      const id = userLikes.length == 0 ? undefined : userLikes[0].id;
      setUserLikeId(id);
      setLikes(post.likes.length);
      setLiked(userLikes.length != 0);
    }
  }, [post]);
  return (
    <>
      {liked ? (
        <IconButton onClick={handleDislike} size="sm" aria-label="Dislike" icon={<FcLike />} />
      ) : (
        <IconButton onClick={handleLike} size="sm" aria-label="Like" icon={<FcLikePlaceholder />} />
      )}
      <Text>{likes}</Text>
    </>
  );
}
