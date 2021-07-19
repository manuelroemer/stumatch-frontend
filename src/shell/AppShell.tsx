import { Flex } from '@chakra-ui/layout';
import { Route } from 'react-router';
import { routes } from '../constants';
import AdministrationPage from '../pages/administration/AdministrationPage';
import ChatPage from '../pages/chat/ChatPage';
import AdvertisementOverviewPage from '../pages/advertising/AdvertisementOverviewPage';
import FeedPage from '../pages/feed/FeedPage';
import MatchingPage from '../pages/matching/MatchingPage';
import NotificationPage from '../pages/notifications/NotificationPage';
import NavBar from './NavBar';
import PostPage from '../pages/feed/PostPage';
import friendsListPage from '../pages/friendsList/friendsListPage';
import ContactPage from '../pages/contact/ContactPage';
import AdvertisementPage from '../pages/advertising/AdvertisementPage';

export default function AppShell() {
  return (
    <Flex direction="column" h="100%">
      <NavBar />
      <Route exact path={routes.feed} component={FeedPage} />
      <Route exact path={routes.postPage} component={PostPage} />
      <Route exact path={routes.matching} component={MatchingPage} />
      <Route exact path={routes.advertising} component={AdvertisementOverviewPage} />
      <Route exact path={routes.advertisementPage} component={AdvertisementPage} />
      <Route exact path={routes.administration} component={AdministrationPage} />
      <Route exact path={routes.notifications} component={NotificationPage} />
      <Route exact path={routes.friendsList} component={friendsListPage} />
      <Route exact path={routes.contact} component={ContactPage} />
      <Route path={routes.chatGroup} component={ChatPage} />
    </Flex>
  );
}
