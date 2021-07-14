import { IoChatbubblesOutline } from 'react-icons/io5';
import { useHistory } from 'react-router';
import { me } from '../api/conventions';
import { routes } from '../constants';
import { useGetAllUserChatGroupsQuery, useUserChatGroupSocketQueryInvalidation } from '../queries/chatGroups';
import NavBarIconButton from './NavBarIconButton';

export default function NavBarChatItem() {
  const history = useHistory();
  const { data: chatGroups } = useGetAllUserChatGroupsQuery(me);
  const hasUnreadChatMessages =
    chatGroups?.result.some((chatGroup) => !chatGroup.mutedByMe && chatGroup.unreadMessages > 0) ?? false;

  useUserChatGroupSocketQueryInvalidation();

  return (
    <NavBarIconButton
      aria-label="Chat"
      icon={<IoChatbubblesOutline />}
      showIndicator={hasUnreadChatMessages}
      onClick={() => history.push(routes.chat)}
    />
  );
}
