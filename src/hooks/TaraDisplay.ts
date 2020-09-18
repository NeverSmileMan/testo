import React, { useState, useRef } from 'react';
import ActiveInputService from '../data.structure/ActiveInputService';
import Message from '../data.structure/Message';

import { InputNumber, IInputNumber, IStateInput } from '../data.structure/InputListNumber';
import { Props } from '../components/tara/TaraDisplay';

const changeState = (
    input: IInputNumber,
    setState: React.Dispatch<() => IStateInput<number>>,
    ref: React.RefObject<HTMLDivElement>,
    onSelect: Props['onSelect'],
) => {
    const activeInputService = ActiveInputService.getInstance();
    const message = Message.getInstance();
    input.onMessage(message);
    input.onChange(setState);
    input.onSelect(onSelect);
    const attachInput = () => {
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    };
    const refreshInput = (valueHTML: string) => {
        if (ref.current) ref.current.innerHTML = valueHTML;
    };
    
    return { attachInput, refreshInput };
}

const useTaraDisplay = (onSelect: Props['onSelect']) => {
    const [input] = useState(() => new InputNumber());
    const [state, setState] = useState(input.getStateObject);
    const ref = useRef(null);
    const [methods] = useState(() => changeState(input, setState, ref, onSelect));

    return { ...state, ...methods, ref };
};

export default useTaraDisplay;
