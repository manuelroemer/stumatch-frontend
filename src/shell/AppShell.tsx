import { Route } from 'react-router';
import { routes } from '../constants';
import AdministrationPage from '../pages/administration/AdministrationPage';
import ChatPage from '../pages/chat/ChatPage';
import FeedPage from '../pages/feed/FeedPage';
import MatchingPage from '../pages/matching/MatchingPage';
import NotificationPage from '../pages/notifications/NotificationPage';
import NavBar from './NavBar';

export default function AppShell() {
  return (
    <>
      <NavBar />
      <Route exact path={routes.feed} component={FeedPage} />
      <Route exact path={routes.matching} component={MatchingPage} />
      <Route exact path={routes.administration} component={AdministrationPage} />
      <Route exact path={routes.notifications} component={NotificationPage} />
      <Route exact path={routes.chat} component={ChatPage} />
    </>
  );
}
