import { ChatGroup } from '../../api/chatGroups';
import { User } from '../../api/users';
import { getFullName } from '../../utils/userUtils';

export function getChatGroupTitle(chatGroup: ChatGroup, currentUser: User) {
  return getOtherParticipants(chatGroup, currentUser)
    .map((user) => getFullName(user))
    .sort((a, b) => a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()))
    .join(', ');
}

export function getOtherParticipants(chatGroup: ChatGroup, currentUser: User) {
  return chatGroup.activeParticipants.filter((user) => user.id !== currentUser.id);
}
