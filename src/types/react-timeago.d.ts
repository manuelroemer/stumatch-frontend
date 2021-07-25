// Type polyfills for missing declarations (best effort).
// See README for details: https://github.com/nmn/react-timeago

declare module 'react-timeago/lib/language-strings/en' {
  declare const engStrings: any;
  export default engStrings;
}

declare module 'react-timeago/lib/formatters/buildFormatter' {
  import { Formatter } from 'react-timeago';
  declare function buildFormatter(strings: any): Formatter;
  export default buildFormatter;
}
