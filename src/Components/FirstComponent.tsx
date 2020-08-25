import React, { useState, useCallback } from 'react';
import FirstObject, { IFirstObject } from '../Objects/FirstObject';

const instance: IFirstObject = FirstObject.getInstance();

const setCallback = (setState: React.Dispatch<{}>) => 
    instance.setCallback(
        () => setState({})
);

const onClick: React.MouseEventHandler = () => {
    instance.setInput(instance.getOutput() + 1);
};

/*-------------------------------------------------------|
|           COMPONENT                                    |
|-------------------------------------------------------*/

function FirstComponent() {

    const [, setState] = useState({});
    useState(() => setCallback(setState));

    return (
        <div onClick={onClick}>
            {instance.getOutput()}
        </div>
    );
}

export default FirstComponent;
