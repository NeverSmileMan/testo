import React, { useState, useCallback } from 'react';
import FirstObject, { IFirstObject } from '../Objects/FirstObject';

const instance: IFirstObject = FirstObject.getInstance();

// interface ComponentState {
//     state: IFirstObject;
// }

// function FirstComponent() {
//     const [{ state }, setState] = useState(({ state: instance }) as ComponentState);

//     useState(() => state.setCallback(() => setState(({ state }) => ({ state }))));

//     const onClick: React.MouseEventHandler = useCallback(() => {
//         state.setInput(state.getOutput() + 1);
//     }, []);

//     return (
//         <div onClick={onClick}>
//             {instance.getOutput()}
//         </div>
//     );
// }

function FirstComponent() {
    const setState = useState({})[1];

    useState(() =>
        instance.setCallback(() => setState({}))
    );

    const onClick: React.MouseEventHandler = useCallback(() => {
        instance.setInput(instance.getOutput() + 1);
    }, []);

    return (
        <div onClick={onClick}>
            {instance.getOutput()}
        </div>
    );
}

export default FirstComponent;
