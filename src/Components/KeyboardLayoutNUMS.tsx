import React from 'react';
import KeyboardObject from '../data.structure/Keyboard';

const keyboard = KeyboardObject.getInstance();

const keys = keyboard.getSet('NUMS')?.map(
    (key, i) => <div className='key' key={i} data-key={key}>{key}</div>
);

function KeyboardLayoutNUMS() {
    if (!keys) return null;
    return <div>{keys}</div>;
}

export default KeyboardLayoutNUMS;
