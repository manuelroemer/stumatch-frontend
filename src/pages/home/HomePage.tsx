import FeedPage from '../feed/FeedPage';
import LandingPage from '../landing/LandingPage';

/**
 * The home page is a special page which is displayed at the app's base/root URL.
 * When a user is logged out, it displays the landing page, allowing login and registration.
 * Otherwise displays the app's feed.
 */
export default function HomePage() {
  // TODO: Progressively enhance with actual login functionality.
  const isLoggedIn = false;
  return isLoggedIn ? <FeedPage /> : <LandingPage />;
}
