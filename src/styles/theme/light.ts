import { css } from 'styled-components/native';

export default {
  title: 'light',

  colors: {
    primary: '#343152',
    secundary: '#DE595C',

    background: '#f5f5f5',
    text: '#343152',
    input: '#eeedf0',
    textButton: '#fff',
    textInput: '#333333',
    success: '#5DB85C',
    successLight: '#CBEDCA',
    dark: '#333333',
    darkLight: '#C4C4C4',
    danger: '#E04848',
    dangerLight: '#F4C7C7',
    disable: 'rgba(255, 255, 255, 0.3)',
  },

  typograph: {
    textH3Normal: css`
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
    `,
    textH3Bold: css`
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
    `,
    textH2Normal: css`
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
    `,
    textH2Bold: css`
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
    `,
    textH1Normal: css`
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
    `,
    textH1Bold: css`
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
    `,
  },
};
