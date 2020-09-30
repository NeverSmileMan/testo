import { Dispatch, SetStateAction } from 'react';
import { IItem } from '../search.list/Item';
import { ItemTypes } from '../../enum/item.types';
import { IInputService, ISearchService } from '../services/Services';

export interface IStateInput {
  value: string;
  isFocus: boolean;
  callbackOnSelect: (item: IItem) => void;
}

export const getStateInput = (): IStateInput => ({
  value: '',
  isFocus: true,
  callbackOnSelect: (item: IItem) => item,
});

export interface IMethodsInput {
  setValue: (newValue?: SetStateAction<string>) => void;
  setCallbacks: (callbacks: ICallbacks) => void;
  attachInput: () => void;
  selectItem: (item: IItem) => void;
  searchService: ISearchService;
  pressKey: (key: string) => void;
  onSelect: (callback: (item: IItem) => void) => void;
}

export interface ICallbacks {
  addItem: (item: { item: IItem }) => boolean;
  setSelectedItem: Dispatch<SetStateAction<IItem>>;
}

export const getMethodsInput = (
  setState: Dispatch<SetStateAction<IStateInput>>,
  props: {
    inputService?: IInputService;
    searchService: ISearchService;
  },
): IMethodsInput => {
  const { inputService, searchService } = props;

  const setValue = (newValue?: SetStateAction<string>) =>
    setState((state) => {
      if (typeof newValue === 'function') {
        return { ...state, value: newValue(state.value).toUpperCase() };
      }
      return { ...state, value: newValue ? newValue.toUpperCase() : '' };
    });

  const addSymbol = (value: string) =>
    setState((state) => {
      const newValue: string = state.value + value.toUpperCase();
      return { ...state, value: newValue };
    });

  const delSymbol = () =>
    setState((state) => ({
      ...state,
      value: state.value.substring(0, state.value.length - 1),
    }));

  const pressKey = (key: string) => {
    try {
      switch (key) {
        case 'SPACE':
          addSymbol(' ');
          break;
        case 'BACKSPACE':
          delSymbol();
          break;
        case 'CLEAR':
          setValue('');
          break;
        case 'ENTER':
          // selectItem();
          break;
        default:
          addSymbol(key);
      }
    } catch (e) {
      // throw new Error();
    }
  };

  const onSelect = (callback: (item: IItem) => void) =>
    setState((state) => ({
      ...state,
      callbackOnSelect: callback,
    }));

  const selectItem = (item: IItem) => {
      console.log(item);
    setState((state) => {
      try {
        state.callbackOnSelect(item);
      } catch {
        return state;
      }
      return state;
    });
  };

  const setCallbacks = (callbacks: ICallbacks) => {
    onSelect((item: IItem) => {
      if (item.type === ItemTypes.WEIGHED) {
        callbacks.addItem({ item });
        return;
      }
      callbacks.setSelectedItem(item);
    });
  };

  const attachInput = () => {
    if (!inputService) return undefined;
    inputService.setActive(setValue);
    return () => inputService.unsetActive(setValue);
  };

  //   const setFocus = () =>
  //     setState((state) => ({
  //       ...state,
  //       isFocus: true,
  //     }));

  //   const blurFocus = () =>
  //     setState((state) => ({
  //       ...state,
  //       isFocus: false,
  //     }));

  return {
    setValue,
    setCallbacks,
    attachInput,
    selectItem,
    searchService,
    pressKey,
    onSelect,
  };
};
