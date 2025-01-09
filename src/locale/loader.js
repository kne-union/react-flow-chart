export const message = {};

const loader = (locale, localeMessage) => {
  message[locale] = localeMessage;
};

export default loader;
