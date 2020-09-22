import { Dispatch } from 'react';
import { IItem } from '../../../data/Item';

export interface IStateInput {
    value: string;
    isFocus: boolean;
    callbackOnSelect: (item: IItem) => void;
}

export const getStateInput = (): IStateInput => ({
    value: '',
    isFocus: false,
    callbackOnSelect: (item: IItem) => {},
});

export interface IMethodsInput {
    setValue: (value: string) => void;
    getValueHTML: (state: IStateInput) => string;
    pressKey: (key: string) => void;
    onSelect: (callbac: (item: IItem) => void) => void;
    _onSelect: (item: IItem) => void;
    // setFocus: () => void;
    // blurFocus: () => void;
}

export const getMethodsInput = (
    setState: Dispatch<(state: IStateInput) => IStateInput>,
): IMethodsInput => {

    const setValue = (value: string = '') => setState(state => ({
        ...state, value: value.toUpperCase(),
    }));

    const getValueHTML = (state: IStateInput) =>
        (' ' + state.value.replace(/ /g, '&nbsp;'));

    const addSymbol = (value: string) => setState(state => ({
        ...state,
        value: state.value += value,
    }));
    
    const delSymbol = () => setState(state => ({
        ...state,
        value: state.value.substring(0, state.value.length - 1),
    }));

    const pressKey = (key: string) => setState(state => {
        const currentValue = state.value;
        try {
            switch(key) {
                case "SPACE":
                    addSymbol(' ');
                    break;
                case "BACKSPACE":
                    delSymbol();
                    break;
                case "CLEAR":
                    setValue('');
                    break;
                case "ENTER":
                    // onSelect(?);
                    break;         
                default:
                    addSymbol(key);
            }
        } catch(e) {
            setState(state => ({
                ...state,
                value: currentValue,
            }));
            // throwMessage
        }
        return state;
    });

    const onSelect = (callback: (item: IItem) => void) => setState(state => ({
        ...state,
        callbackOnSelect: callback,
    }));

    const _onSelect = (item: IItem) => setState(state => {
            console.log('ADD ITEM: ', item);
            // alert('ADD ITEM: ' + item.searchIndex);
            state.callbackOnSelect(item);
            return state;
    });

    const setFocus = () => setState(state => ({
        ...state,
        isFocus: true,
    }));

    const blurFocus = () => setState(state => ({
        ...state,
        isFocus: false,
    }));

    return { 
        setValue, getValueHTML, pressKey,
        onSelect, _onSelect,
    };
};
