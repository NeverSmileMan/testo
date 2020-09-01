import React from 'react';
import TaraButton from './TaraButton';
import PrintButton from './PrintButton';
import CloseButton from './CloseButton';

function Controls() { 
    return (
        <div className='controls'>
            <TaraButton />
            <PrintButton />
            <CloseButton />
        </div>
    );
}

export default Controls;
