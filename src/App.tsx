import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { appTheme } from './theme';
import { useAutomaticUserLogin, useUserStore } from './stores/userStore';
import LandingPage from './pages/landing/LandingPage';
import AppShell from './shell/AppShell';
import { routes } from './constants';

export default function App() {
  const user = useUserStore((state) => state.user);
  useAutomaticUserLogin();

  return (
    <ChakraProvider theme={appTheme}>
      <BrowserRouter>
        <Switch>
          <Route exact path={routes.root} render={() => (user ? <Redirect to={routes.feed} /> : <LandingPage />)} />
          <Route render={() => (user ? <AppShell /> : <Redirect to={routes.root} />)} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
