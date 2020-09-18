import React, { useState, useRef, useEffect, SetStateAction } from 'react';
// import ActiveInputService from '../services/ActiveInputService';
import { ActiveInputService } from '../../../services/ActiveInputService';
import { InputList, IInputList, IStateInput } from '../data/InputListNumber';
import { Props } from '../components//Search';

const changeState = (
    input: IInputList,
    setState: React.Dispatch<() => IStateInput<string>>,
    ref: React.RefObject<HTMLDivElement>,
    callbacks: Props['callbacks'],
) => {
    // const activeInputService = ActiveInputService.getInstance();
    input.onChange(setState);
    // input.onSelect(callbacks.onSelect);
    // callbacks.resetSearch(() => input.setValue(''));
    const onListSelect = input._onSelect;
    // const attachInput = () => {
    //     activeInputService.setActiveInput(input);
    //     return () => activeInputService.delActiveInput(input);
    // };
    const setValue = (getNewValue: SetStateAction<string>) => {
        if (typeof getNewValue === 'function')
            input.setValue(getNewValue(input.getValue()))
    };
    const attachInput = () => {
        ActiveInputService.setActive(setValue);
        return () => ActiveInputService.unsetActive(setValue);
    };
    const refreshInput = (valueHTML: string) => {
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
