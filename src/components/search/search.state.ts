import { Dispatch } from 'react';
import { IItem } from '../search.list/Item';

export interface IStateInput {
  value: string;
  isFocus: boolean;
  callbackOnSelect: (item: IItem) => void;
}

export const getStateInput = (): IStateInput => ({
  value: '',
  isFocus: false,
  // eslint-disable-next-line no-console
  callbackOnSelect: (item: IItem) => console.log(item),
});

export interface IMethodsInput {
  setValue: (value: string) => void;
  getValueHTML: (state: IStateInput) => string;
  pressKey: (key: string) => void;
  onSelect: (callback: (item: IItem) => void) => void;
  selectItem: (item: IItem) => void;
  // setFocus: () => void;
  // blurFocus: () => void;
}

export const getMethodsInput = (
  setState: Dispatch<(state: IStateInput) => IStateInput>,
): IMethodsInput => {
  const setValue = (value = '') =>
    setState((state) => ({
      ...state,
      value: value.toUpperCase(),
    }));

  const getValueHTML = (state: IStateInput) => `&nbsp;${state.value.replace(/ /g, '&nbsp;')}`;

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
            // onSelect(?);
            break;
          default:
            addSymbol(key);
        }
      } catch (e) {
        return {
          ...state,
          value: currentValue,
        };
        // throwMessage
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
    getValueHTML,
    pressKey,
    onSelect,
    selectItem,
  };
};
