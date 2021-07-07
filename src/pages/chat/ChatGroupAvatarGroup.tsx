import { AvatarGroup, Avatar } from '@chakra-ui/react';
import { ChatGroup } from '../../api/chatGroups';
import { useCurrentUser } from '../../stores/userStore';
import { getFullName } from '../../utils/userUtils';
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
        <Avatar key={user.id} name={getFullName(user)} />
      ))}
    </AvatarGroup>
  );
}
