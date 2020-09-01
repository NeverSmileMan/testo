import React from 'react';
import KeyboardObject from '../data.structure/Keyboard';

const keyboard = KeyboardObject.getInstance();

const keys = keyboard.getSet('UA')?.map(
    (key, i) => <div className='key' key={i} data-key={key}>{key}</div>
);

function KeyboardLayoutUA() {
    if (!keys) return null;
    return <div>{keys}</div>;
}

export default KeyboardLayoutUA;
