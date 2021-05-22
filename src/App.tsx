import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { appTheme } from './theme';
import { useUserStore } from './stores/userStore';
import LandingPage from './pages/landing/LandingPage';
import AppShell from './shell/AppShell';
import { routes } from './constants';
import LoadingOverlay from './shell/LoadingOverlay';
import { useEffect, useState } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = useUserStore((state) => state.userInfo);
  const tryLoadRememberedLogin = useUserStore((state) => state.tryLoadRememberedUser);

  useEffect(() => {
    tryLoadRememberedLogin().finally(() => setIsLoading(false));
  }, []);

  return (
    <ChakraProvider theme={appTheme}>
      <LoadingOverlay show={isLoading}>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={routes.root}
              render={() => (userInfo ? <Redirect to={routes.feed} /> : <LandingPage />)}
            />
            <Route render={() => (userInfo ? <AppShell /> : <Redirect to={routes.root} />)} />
          </Switch>
        </BrowserRouter>
      </LoadingOverlay>
    </ChakraProvider>
  );
}
