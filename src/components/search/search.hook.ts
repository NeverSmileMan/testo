import {
  useState,
  useRef,
  useEffect,
  useContext,
  SetStateAction,
  Dispatch,
  RefObject,
} from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';
import { MainContext } from '../../entries/components/main/main';
import { IItem, ItemType } from '../search.list/Item';
import { getStateInput, IStateInput, getMethodsInput } from './search.state';

interface ICallbacksNew {
  addItem: (item: { item: IItem }) => boolean;
  setSelectedItem: Dispatch<SetStateAction<IItem>>;
}

const createMethods = (
  setState: Dispatch<(state: IStateInput) => IStateInput>,
  ref: RefObject<HTMLDivElement>,
) => {
  const methods = getMethodsInput(setState);

  const setNewValue = (getNewValue: SetStateAction<string>) =>
    setState((state) => {
      if (typeof getNewValue === 'function')
        return { ...state, value: getNewValue(state.value).toUpperCase() };
      return state;
    });

  const setNewCallbacks = (callbacksNew: ICallbacksNew) => {
    methods.onSelect((item: IItem) => {
      if (item.type === ItemType.WEIGHT) {
        callbacksNew.addItem({ item });
        return;
      }
      callbacksNew.setSelectedItem(item);
    });
  };

  const attachInput = () => {
    ActiveInputService.setActive(setNewValue);
    return () => ActiveInputService.unsetActive(setNewValue);
  };

  const refreshInput = (valueHTML: string) => {
    const elem = ref.current;
    if (elem) elem.innerHTML = valueHTML;
  };

  return { ...methods, attachInput, refreshInput, setNewCallbacks };
};

type IUseSearch = {
  ref: RefObject<HTMLDivElement>;
  selectItem: (item: IItem) => void;
} & IStateInput;

export const useSearch = (): IUseSearch => {
  const [state, setState] = useState<IStateInput>(getStateInput);
  const ref = useRef(null);
  const callbacksNew: ICallbacksNew = useContext(MainContext);

  const [
    { attachInput, refreshInput, getValueHTML, setValue, setNewCallbacks, selectItem },
  ] = useState(() => createMethods(setState, ref));

  useEffect(() => {
    setNewCallbacks(callbacksNew);
    setValue('');
  }, [setNewCallbacks, setValue, callbacksNew]);
  useEffect(() => refreshInput(getValueHTML(state)), [refreshInput, getValueHTML, state]);
  useEffect(attachInput, [attachInput]);
  return { ...state, ref, selectItem };
};
