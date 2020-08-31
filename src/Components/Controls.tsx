import React from 'react';
import TaraButton from './TaraButton';
import PrintButton from './PrintButton';
import CloseButton from './CloseButton';

const style: React.CSSProperties = {
    top: '80px',
    left: '850px',
    height: '424px',
    width: '146px',
}

function Controls() { 
    return (
        <div className='controls' style={style}>
            <TaraButton />
            <PrintButton />
            <CloseButton />
        </div>
    );
}

export default Controls;
