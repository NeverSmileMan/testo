import React, { useState, useRef } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import { InputList, IInputList, IStateInputList } from '../data.structure/Input';
import { Props } from '../components/search/Search';

const changeState = (
    input: IInputList,
    setState: React.Dispatch<() => IStateInputList>,
    ref: React.RefObject<HTMLDivElement>,
    callbacks: Props['callbacks'],
) => {

    const activeInputService = ActiveInputService.getInstance();
    const getState = input.getStateInput;
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    input.onSelect(callbacks.onSelect);
    callbacks.resetSearch(() => input.setValue(''));

    const onListSelect = input._onSelect;
    const attachInput = () => {
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    };
    const refreshInput = (valueHTML: string) => {
        if (ref.current) ref.current.innerHTML = valueHTML;
    };
    
    return { onListSelect, attachInput, refreshInput };
}

const useSearch = (callbacks: Props['callbacks']) => {
    const [input] = useState(() => new InputList());
    const [state, setState] = useState(input.getStateInput);
    const ref = useRef(null);
    const [methods] = useState(() => changeState(input, setState, ref, callbacks));

    return { ...state, ...methods, ref };
};

export default useSearch;
