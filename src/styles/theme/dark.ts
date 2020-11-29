import { css } from 'styled-components/native';

export default {
  title: 'dark',

  colors: {
    primary: '#242238',
    secundary: '#3A3A44',

    background: '#19191D',
    input: '#3A3A44',
    text: '#BFC3C2',
    textButton: '#f5f5f5',
    textInput: '#ddd',
    success: '#275D5A',
    successLight: '#083935',
    dark: '#333333',
    darkLight: '#C4C4C4',
    danger: '#C32530',
    dangerLight: '#631B2C',
    disable: 'rgba(0, 0, 0, 0.4)',
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
    textH1Bold: css`
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
    `,
  },
};
