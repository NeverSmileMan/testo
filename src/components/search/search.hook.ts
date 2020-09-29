import {
  useState,
  useEffect,
  useContext,
} from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';
import { MainContext } from '../../entries/components/main/main';
import { IItem } from '../search.list/Item';
import { getStateInput, IStateInput, getMethodsInput, ICallbacks } from './search.state';
import { useStyles } from './search.styles';

type IUseSearch = {
  classes: Record<string, string>;
  value: string;
  selectItem: (item: IItem) => void;
};

export const useSearch = (): IUseSearch => {
  const [{ value, isFocus }, setState] = useState<IStateInput>(getStateInput);
  const callbacksNew: ICallbacks = useContext(MainContext);
  const [methods] = useState(() => getMethodsInput(setState));
  const classes = useStyles(isFocus);

  useEffect(() => methods.setCallbacks(callbacksNew), [methods, callbacksNew]);
  useEffect(() => methods.attachInput(), [methods]);
  return { classes, value, selectItem: methods.selectItem };
};
