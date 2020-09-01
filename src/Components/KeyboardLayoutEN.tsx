import React from 'react';
import KeyboardObject from '../data.structure/Keyboard';

const keyboard = KeyboardObject.getInstance();

const keys = keyboard.getSet('EN')?.map(
    (key, i) => <div className='key' key={i} data-key={key}>{key}</div>
);

function KeyboardLayoutEN() {
    if (!keys) return null;
    return <div>{keys}</div>;
}

export default KeyboardLayoutEN;
