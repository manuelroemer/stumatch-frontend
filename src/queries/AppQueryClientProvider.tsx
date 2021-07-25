import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useToast } from '@chakra-ui/react';
import { useRef } from 'react';

/**
 * Initializes the {@link QueryClient} used by the app.
 * Must be configured at the app's component tree root.
 */
export function AppQueryClientProvider({ children }: PropsWithChildren<{}>) {
  const toast = useToast();
  const showGenericErrorToast = (message: string) => {
    toast({
      title: 'Whoops! Something went wrong...',
      description: message,
      status: 'error',
      duration: 10_000,
      isClosable: true,
    });
  };

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          onError: (error) => {
            console.warn('A query failed with an error: ', error);
            showGenericErrorToast(
              'Unfortunately we were unable to correctly load the page. Please try reloading the page and contact the system administrator if the problem persists.',
            );
          },
        },
        mutations: {
          onError: (error) => {
            console.error('A mutation failed with an error: ', error);
            showGenericErrorToast(
              'We are sorry - we ran into an error. Please retry your last action and contact the system administrator if the problem persists.',
            );
          },
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
