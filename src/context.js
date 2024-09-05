import { createContext, useContext as useReactContext } from 'react';

export const context = createContext({});
export const { Provider, Consumer } = context;
export const useContext = () => {
  return useReactContext(context);
};
export default context;
