import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { appTheme } from './theme';
import { useUserStore } from './stores/userStore';
import LandingPage from './pages/landing/LandingPage';
import AppShell from './shell/AppShell';
import { routes } from './constants';
import LoadingOverlay from './shell/LoadingOverlay';
import { useEffect, useState } from 'react';
import NotConnectedOverlay from './shell/NotConnectedOverlay';
import { connectSocket } from './api/socket';
import { AppQueryClientProvider } from './queries/provider';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const hasLoggedInUser = useUserStore((state) => !!state.userInfo);
  const tryLoadRememberedLogin = useUserStore((state) => state.tryLoadRememberedUser);
  const token = useUserStore((state) => state.userInfo?.token);

  useEffect(() => {
    tryLoadRememberedLogin().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (token) {
      connectSocket(token);
      console.info('Socket connected.');
    }
  }, [token]);

  return (
    <AppQueryClientProvider>
      <ChakraProvider theme={appTheme}>
        <NotConnectedOverlay>
          <LoadingOverlay show={isLoading}>
            <BrowserRouter>
              <Switch>
                <Route
                  exact
                  path={routes.root}
                  render={() => (hasLoggedInUser ? <Redirect to={routes.feed} /> : <LandingPage />)}
                />
                <Route render={() => (hasLoggedInUser ? <AppShell /> : <Redirect to={routes.root} />)} />
              </Switch>
            </BrowserRouter>
          </LoadingOverlay>
        </NotConnectedOverlay>
      </ChakraProvider>
    </AppQueryClientProvider>
  );
}
