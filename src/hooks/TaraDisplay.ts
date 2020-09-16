import React, { useState, useRef } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import { InputNumber, IInputNumber, IStateInputNumber } from '../data.structure/Input';

const activeInputService = ActiveInputService.getInstance();

const changeState = (
    input: InputNumber,
    onSelect: (value: number) => void,
    setState: React.Dispatch<() => IStateInputNumber>,
) => {
    const getState = input.getStateInput;
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    input.onSelect(onSelect);
    return getState();
}

export const attachInput = (input: IInputNumber) => {
    activeInputService.setActiveInput(input);
    return () => activeInputService.delActiveInput(input);
};

export const refreshInput = (ref: React.RefObject<HTMLDivElement>, valueHTML: string) => {
    if (ref.current) ref.current.innerHTML = valueHTML;
};

const useTaraDisplay = (onSelect: (value: number) => void) => {
    const [input] = useState(() => new InputNumber());
    const [state, setState] = useState(input.getStateInput);
     useState<IStateInputNumber>(() => changeState(input, onSelect, setState));
    const ref = useRef(null);
    return { ...state, input, ref };
};

export default useTaraDisplay;
