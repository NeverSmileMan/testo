import { useState, useEffect, useContext } from 'react';
import { MainContext } from '../../entries/components/main/main';
import { IItem } from '../search.list/Item';
import { getStateInput, IStateInput, getMethodsInput, ICallbacks } from './search.state';
import { useStyles } from './search.styles';
import { IInputService, ISearchService } from '../services/Services';

type IUseSearch = {
  classes: Record<'wrapper', string>;
  value: string;
  selectItem: (item: IItem) => void;
  searchService: ISearchService;
};

export type PropsSearch = {
  value?: string;
  inputService?: IInputService;
  searchService: ISearchService;
};

export const useSearch = (props: PropsSearch): IUseSearch => {
  const [{ value, isFocus }, setState] = useState<IStateInput>(getStateInput);
  const callbacksNew: ICallbacks = useContext(MainContext);
  const [methods] = useState(() => getMethodsInput(setState, props));
  const classes = useStyles(isFocus);

  useEffect(() => methods.setValue(props.value), [methods, props]);
  useEffect(() => methods.setCallbacks(callbacksNew), [methods, callbacksNew]);
  useEffect(() => methods.attachInput(), [methods]);
  return { classes, value, ...methods };
};
