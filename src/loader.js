export const message = {};

const loader = (locale, localeMessage) => {
  message[locale] = localeMessage;
  return message;
};

export default loader;
