import { Avatar, AvatarProps } from '@chakra-ui/react';
import { tryGetBlobUrl } from '../api/blob';
import { useGetUserQuery } from '../queries/users';
import { useCurrentUser } from '../stores/userStore';
import { getFullName } from '../utils/userUtils';

export interface UserAvatarProps extends AvatarProps {
  /**
   * The ID of the user whose avatar should be displayed.
   * If `undefined`, the currently logged in user is used instead.
   */
  userId?: string;
}

export default function UserAvatar({ userId, ...rest }: UserAvatarProps) {
  const thisUserId = useCurrentUser().id;
  const finalUserId = userId ?? thisUserId;
  const { data } = useGetUserQuery(finalUserId);

  return (
    <Avatar
      name={data ? getFullName(data.result) : undefined}
      src={tryGetBlobUrl(data?.result.profileImageBlobId)}
      {...rest}
    />
  );
}
