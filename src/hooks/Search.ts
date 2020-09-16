import React, { useState, useRef, useCallback } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import { InputList, IInputList, IStateInputList } from '../data.structure/Input';
import { Props } from '../components/search/Search';

const activeInputService = ActiveInputService.getInstance();

const changeState = (
    input: IInputList,
    callbacks: Props['callbacks'],
    setState: React.Dispatch<() => IStateInputList>,
) => {
    const getState = input.getStateInput;
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    input.onSelect(callbacks.onSelect);
    callbacks.resetSearch(() => input.setValue(''));
    return getState();
}

export const attachInput = (input: IInputList) => {
    activeInputService.setActiveInput(input);
    return () => activeInputService.delActiveInput(input);
};

export const refreshInput = (ref: React.RefObject<HTMLDivElement>, valueHTML: string) => {
    if (ref.current) ref.current.innerHTML = valueHTML;
};

const useSearch = (callbacks: Props['callbacks']) => {
    const [input] = useState(() => new InputList());
    const [state, setState] = useState(input.getStateInput);
    useState(() => changeState(input, callbacks, setState));
    const ref = useRef(null);
    const onListSelect = useCallback(input._onSelect, [input]);
    return { ...state, input, ref, onListSelect };
};

export default useSearch;
