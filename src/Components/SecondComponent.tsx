import React, { useState, useCallback } from 'react';
import SecondObject, { ISecondObject } from '../Objects/SecondObject';

const instance: ISecondObject = SecondObject.getInstance();

// interface ComponentState {
//     state: ISecondObject;
// }

// function SecondComponent() {
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

function SecondComponent() {
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

export default SecondComponent;
