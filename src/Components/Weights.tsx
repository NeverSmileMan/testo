import React, { useState } from 'react';
import WeightsObject from '../data.structure/Weights';

const weights = WeightsObject.getInstance();

function Weights() {
    const [, setState] = useState({});

    useState(() => {
        weights.on('stateChange', () =>
            setState({}))
    });

    return (
        <div className='weights'>
            <div>WEIGHTS</div>
            <div><span>Weight: </span>{weights.getWeight()}</div> 
            <div><span>Tara: </span>{weights.getTara()}</div>
            <div><span>Sum: </span>{weights.getSum()}</div>
        </div>
    );
}

export default Weights;
