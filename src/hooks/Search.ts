import React, { useState, useRef, useEffect } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import { InputList, IInputList, IStateInput } from '../data.structure/InputListNumber';
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
        console.log(valueHTML);
        if (ref.current) ref.current.innerHTML = valueHTML;
    };
    return { onListSelect, attachInput, refreshInput };
}

const useSearch = (callbacks: Props['callbacks']) => {
    const [input] = useState(() => new InputList());
    const [{ isFocus, value, valueHTML }, setState] = useState(input.getStateObject);
    const ref = useRef(null);
    const [{ attachInput, refreshInput, onListSelect }] = useState(
        () => changeState(input, setState, ref, callbacks)
    );
    useEffect(() => refreshInput(valueHTML), [refreshInput, valueHTML]);
    useEffect(attachInput, [attachInput]);
    return { isFocus, value, ref, onListSelect };
};

export default useSearch;
