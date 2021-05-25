import { theme, extendTheme } from '@chakra-ui/react';

export const appTheme = extendTheme({
  colors: {
    primary: theme.colors.blue,
  },
  layerStyles: {
    fullPageOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      w: '100%',
      h: '100%',
    },
    timeAgoHint: {
      fontSize: 'xs',
      color: 'gray.500',
      whiteSpace: 'nowrap',
    },
  },
  styles: {
    global: {
      'html, body, #root': {
        minHeight: '100vh',
      },
    },
  },
});
