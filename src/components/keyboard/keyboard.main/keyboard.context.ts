import React from 'react';
import { Lang } from './keyboard.interfaces';

export const LayoutContext = React.createContext<Context<Lang>>({
  name: 'en',
  setName: () => {},
  names: [],
});

export interface Context<T> {
  name: T;
  setName: (val: T) => void;
  names: T[];
}
