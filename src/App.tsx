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
import { AppQueryClientProvider } from './queries/AppQueryClientProvider';
import { SocketContext, useConnectedSocket } from './sockets/socket';
import ContactPage from './pages/contact/ContactPage';
import { TermsOfUsePage } from './pages/termsOfUse/TermsOfUsePage';
import { PrivacyPolicyPage } from './pages/privacyPolicy/PrivacyPolicyPage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const hasLoggedInUser = useUserStore((state) => !!state.userInfo);
  const tryLoadRememberedLogin = useUserStore((state) => state.tryLoadRememberedUser);
  const token = useUserStore((state) => state.userInfo?.token);
  const socket = useConnectedSocket(token);

  useEffect(() => {
    tryLoadRememberedLogin().finally(() => setIsLoading(false));
  }, []);

  return (
    <ChakraProvider theme={appTheme}>
      <AppQueryClientProvider>
        <SocketContext.Provider value={{ socket }}>
          <NotConnectedOverlay>
            <LoadingOverlay show={isLoading}>
              <BrowserRouter>
                <Switch>
                  <Route
                    exact
                    path={routes.root}
                    render={() => (hasLoggedInUser ? <Redirect to={routes.feed} /> : <LandingPage />)}
                  />
                  {!hasLoggedInUser && <Route exact path={routes.contact} component={ContactPage} />}
                  {!hasLoggedInUser && <Route exact path={routes.termsOfUse} component={TermsOfUsePage} />}
                  {!hasLoggedInUser && <Route exact path={routes.privacyPolicy} component={PrivacyPolicyPage} />}
                  <Route render={() => (hasLoggedInUser ? <AppShell /> : <Redirect to={routes.root} />)} />
                </Switch>
              </BrowserRouter>
            </LoadingOverlay>
          </NotConnectedOverlay>
        </SocketContext.Provider>
      </AppQueryClientProvider>
    </ChakraProvider>
  );
}
