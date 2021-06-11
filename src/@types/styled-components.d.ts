/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import light from '../styles/theme/light';

declare module 'styled-components' {
  type ThemeType = typeof light;
  export interface DefaultTheme extends ThemeType {}
}
