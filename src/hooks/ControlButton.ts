import React, { useState } from 'react';
import { IControlButton, IStateControlButton } from '../data.structure/ControlButton';

function getHookControlButton(button: IControlButton) {

    function changeState(
        setState: React.Dispatch<() => IStateControlButton>,
        onAction?: () => void,
        doAction?: (callback: () => void) => void,
    ) { 
        button.onChange(setState);
        button.onAction(onAction);
        if (doAction) doAction(button.doAction);
        const onClick = () => button.doAction();
        const setActive = (isActive?: boolean) => {
            !(isActive === undefined) && button.setActive(isActive);
        };
        return { onClick, setActive };
    }

    const useControlButton = (onAction?: () => void, doAction?: (callback: () => void) => void) => {
        const [state, setState] = useState<IStateControlButton>(button.getStateControlButton);
        const [methods] = useState(() => changeState(setState, onAction, doAction));
        return { ...state, ...methods };
    };
    
    return useControlButton;
}

export default getHookControlButton;
