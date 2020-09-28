import React from 'react';
import { Lang } from "./keyboard.interfaces";

const LayoutContext = React.createContext({
  name: '' as Lang,
  setName: () => {},
  names: [] as Lang[],
} as Context);

export default LayoutContext;

interface Context {
  name: Lang;
  setName: (val: Lang) => void;
  names: Lang[];
}
