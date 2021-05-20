import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { useUserStore } from './stores/userStore';

export default function App() {
  const tryLoadRememberedLogin = useUserStore((state) => state.tryLoadRememberedLogin);
  useEffect(() => tryLoadRememberedLogin(), []);

  return (
    <ChakraProvider>
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
