import React from 'react';
import { Lang } from './keyboard.interfaces';

export const LayoutContext = React.createContext<Context>({
  name: 'en',
  setName: () => {},
  names: [],
} as Context);

interface Context {
  name: Lang;
  setName: (val: Lang) => void;
  names: Lang[];
}
