import { IoChatbubblesOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { me } from '../api/conventions';
import { routes } from '../constants';
import { useGetAllUserChatGroupsQuery, useUserChatGroupSocketQueryInvalidation } from '../queries/chatGroups';
import NavBarIconButton from './NavBarIconButton';

export default function NavBarChatItem() {
  const { data: chatGroups } = useGetAllUserChatGroupsQuery(me);
  const hasUnreadChatMessages =
    chatGroups?.result.some((chatGroup) => !chatGroup.mutedByMe && chatGroup.unreadMessages > 0) ?? false;

  useUserChatGroupSocketQueryInvalidation();

  return (
    <Link to={routes.chat}>
      <NavBarIconButton
        aria-label="Chat"
        icon={<IoChatbubblesOutline size="18" />}
        showIndicator={hasUnreadChatMessages}
      />
    </Link>
  );
}
