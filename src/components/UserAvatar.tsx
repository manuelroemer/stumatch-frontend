import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useCurrentUser } from '../stores/userStore';
import { getFullName } from '../utils/userUtils';

export default function UserAvatar({ ...rest }: AvatarProps) {
  const user = useCurrentUser();
  return <Avatar name={getFullName(user)} {...rest} />;
}
