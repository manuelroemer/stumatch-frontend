import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { appTheme } from './theme';
import { useAutomaticUserLogin } from './stores/userStore';

export default function App() {
  useAutomaticUserLogin();

  return (
    <ChakraProvider theme={appTheme}>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
}
