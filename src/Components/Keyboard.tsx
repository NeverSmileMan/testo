import React from 'react';
import KeyboardObject from '../data.structure/Keyboard';

const keyboard = KeyboardObject.getInstance();

const style: React.CSSProperties = {
    top: '638px',
    left: '10px',
    height: '200px',
    width: '1000px',
}

const onClick = () => {
    keyboard.onClick('A');
};

function Keyboard() {
    return (
        <div className='keyboard' style={style} onClick={onClick}>
            KEYBOARD
            {/* <div>Symbol</div>
            <div>BACKSPACE</div>
            <div>CLEAR</div> */}
        </div>
    );
}

export default Keyboard;
