import React, { useState } from 'react';
import { Mode, State } from '../data.structure/types/types';
import { IControlButton } from '../data.structure/ControlButton';

function getHookControlButton(object: IControlButton) {
    const onClick = () => object.doAction();

    interface IStateControlButton {
        mode: Mode;
        currentIsActive: boolean;
    }

    const getState = () => ({
        mode: object.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON,
        currentIsActive: object.isActive(),
    });

    const setActive = (isActive?: boolean) => { !(isActive === undefined) && object.setActive(isActive) };

    function changeState(
        setState: React.Dispatch<() => IStateControlButton>,
        onAction?: () => void,
        doAction?: (callback: () => void) => void,
    ) { 
        object.onChange(() => setState(() => getState()));
        object.onAction(onAction);
        if (doAction) doAction(object.doAction.bind(object));
    }

    const useControlButton = (onAction?: () => void, doAction?: (callback: () => void) => void) => {
        const [state, setState] = useState<IStateControlButton>(() => getState());
        useState(() => changeState(setState, onAction, doAction));
        return state;
    };
    
    return { useControlButton, onClick, setActive };
}

export default getHookControlButton;
