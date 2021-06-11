const light: Theme = {
  title: 'light',

  colors: {
    primary: '#343152',
    secundary: '#DE595C',

    background: '#f5f5f5',
    text: '#343152',
    input: '#eeedf0',
    backgroundButton: '#DE595C',
    textButton: '#fff',
    textInput: '#333333',
    success: '#5DB85C',
    successLight: '#CBEDCA',
    dark: '#333333',
    darkLight: '#C4C4C4',
    danger: '#E04848',
    dangerLight: '#F4C7C7',
    disable: 'rgba(255, 255, 255, 0.3)',
    boxMessage: '#EEEDF0',
  },

  typograph: {
    textH3Normal: `
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
    `,
    textH3Bold: `
      font-style: normal;
      font-weight: bold;
      font-size: 13px;
    `,
    textH2Normal: `
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
    `,
    textH2Bold: `
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
    `,
    textH1Normal: `
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
    `,
    textH1Bold: `
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
    `,
  },
};

export default light;

export type Theme = {
  title: string;
  colors: {
    primary: string;
    secundary: string;

    background: string;
    text: string;
    input: string;
    backgroundButton: string;
    textButton: string;
    textInput: string;
    success: string;
    successLight: string;
    dark: string;
    darkLight: string;
    danger: string;
    dangerLight: string;
    disable: string;
    boxMessage: string;
  };
  typograph: {
    textH3Normal: string;
    textH3Bold: string;
    textH2Normal: string;
    textH2Bold: string;
    textH1Normal: string;
    textH1Bold: string;
  };
};
