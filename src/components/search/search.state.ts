import { Dispatch, SetStateAction, RefObject } from 'react';
import { IItem, ItemType } from '../search.list/Item';
// eslint-disable-next-line import/extensions
import { ActiveInputService } from '../../services/ActiveInputService';

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
  setValue: (newValue: SetStateAction<string>) => void;
  setCallbacks: (callbacks: ICallbacks) => void;
  attachInput: () => void;
  pressKey: (key: string) => void;
  onSelect: (callback: (item: IItem) => void) => void;
  selectItem: (item: IItem) => void;
}

export interface ICallbacks {
  addItem: (item: { item: IItem }) => boolean;
  setSelectedItem: Dispatch<SetStateAction<IItem>>;
}

export const getMethodsInput = (
  setState: Dispatch<(state: IStateInput) => IStateInput>,
): IMethodsInput => {
  const setValue = (newValue: SetStateAction<string> = '') =>
    setState((state) => {
      if (typeof newValue === 'function')
        return { ...state, value: newValue(state.value).toUpperCase() };
      return { ...state, value: newValue.toUpperCase() };
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

  const pressKey = (key: string) =>
    setState((state) => {
      const currentValue = state.value;
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
        return {
          ...state,
          value: currentValue,
        };
        // throw new Error();
      }
      return state;
    });

  const onSelect = (callback: (item: IItem) => void) =>
    setState((state) => ({
      ...state,
      callbackOnSelect: callback,
    }));

  const selectItem = (item: IItem) =>
    setState((state) => {
      try {
        state.callbackOnSelect(item);
      } catch {
        return state;
      }
      return state;
    });

  const setCallbacks = (callbacksNew: ICallbacks) => {
    onSelect((item: IItem) => {
      if (item.type === ItemType.WEIGHT) {
        callbacksNew.addItem({ item });
        return;
      }
      callbacksNew.setSelectedItem(item);
    });
  };

  const attachInput = () => {
    ActiveInputService.setActive(setValue);
    return () => ActiveInputService.unsetActive(setValue);
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
    pressKey,
    onSelect,
    selectItem,
  };
};
