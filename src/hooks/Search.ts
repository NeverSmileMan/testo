import React, { useState, useRef, useEffect } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import { InputList, IInputList, IStateInput } from '../data.structure/Input';
import { Props } from '../components/search/Search';

const changeState = (
    input: IInputList,
    setState: React.Dispatch<() => IStateInput<string>>,
    ref: React.RefObject<HTMLDivElement>,
    callbacks: Props['callbacks'],
) => {
    const activeInputService = ActiveInputService.getInstance();
    input.onChange(setState);
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
    const useNewOrder: Function = (
        callbacks: Props['callbacks'],
        setMethods: React.Dispatch<() => ReturnType<typeof changeState>>
    ) => {
        setMethods(() => changeState(input, setState, ref, callbacks));
    };

    return { onListSelect, attachInput, refreshInput, useNewOrder };
}

const useSearch = (callbacks: Props['callbacks']) => {
    const [input] = useState(() => new InputList());
    const [state, setState] = useState(input.getStateObject);
    const ref = useRef(null);
    const [methods, setMethods] = useState(() => changeState(input, setState, ref, callbacks));
    useEffect(() => methods.useNewOrder(callbacks, setMethods), [callbacks, methods]);
    return { ...state, ref, ...methods };
};

export default useSearch;
