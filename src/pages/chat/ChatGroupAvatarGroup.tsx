import { AvatarGroup } from '@chakra-ui/react';
import { ChatGroup } from '../../api/chatGroups';
import UserAvatar from '../../components/UserAvatar';
import { useCurrentUser } from '../../stores/userStore';
import { getOtherParticipants } from './utils';

export interface ChatGroupAvatarGroupProps {
  chatGroup: ChatGroup;
  maxAvatars?: number;
}

export default function ChatGroupAvatarGroup({ chatGroup, maxAvatars = 2 }: ChatGroupAvatarGroupProps) {
  const currentUser = useCurrentUser();
  const otherParticipants = getOtherParticipants(chatGroup, currentUser);

  return (
    <AvatarGroup max={maxAvatars} size={otherParticipants.length > 1 ? 'xs' : 'md'}>
      {otherParticipants.map((user) => (
        <UserAvatar key={user.id} userId={user.id} />
      ))}
    </AvatarGroup>
  );
}
