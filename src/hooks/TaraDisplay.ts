import React, { useState, useRef } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import { InputNumber, InputList, IInputNumber, IInputList } from '../data.structure/Input';

const activeInputService = ActiveInputService.getInstance();

const changeState = <T extends IInputNumber | IInputList>
(
    input: T,
    onSelect: Parameters<T['onSelect']>['0'],
    setState: React.Dispatch<T['getStateInput']>,
) => {
    const getState = input.getStateInput;
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    if (input instanceof InputNumber)
        input.onSelect(onSelect as (Parameters<IInputNumber['onSelect']>['0']));
    else if (input instanceof InputList)
        input.onSelect(onSelect as (Parameters<IInputList['onSelect']>['0']));
    return getState();
}

export const attachInput = <T extends IInputNumber | IInputList>(input: T) => {
    activeInputService.setActiveInput(input);
    return () => activeInputService.delActiveInput(input);
};

export const refreshInput = (ref: React.RefObject<HTMLDivElement>, valueHTML: string) => {
    if (ref.current) ref.current.innerHTML = valueHTML;
};

const useTaraDisplay = <T extends typeof InputNumber | typeof InputList>
(
    inputClass: T,
    onSelect: (...args: any[]) => void,
) => {
    const [input] = useState(() => new inputClass());
    const [state, setState] = useState(input.getStateInput);
    useState(() => changeState(input, onSelect, setState));
    const ref = useRef(null);
    return { ...state, input, ref };
};

export default useTaraDisplay;
