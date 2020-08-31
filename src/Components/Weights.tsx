import React, { useState } from 'react';
import WeightsObject from '../data.structure/Weights';

const weights = WeightsObject.getInstance();

const style: React.CSSProperties = {
    top: '10px',
    left: '10px',
    height: '100px',
    width: '1000px',
}

function Weights() {
    const [, setState] = useState({});

    useState(() => {
        weights.on('stateChange', () =>
            setState({}))
    });

    return (
        <div className='weights' style={style}>
            <div>WEIGHTS</div>
            <div><span>Weight: </span>{weights.getWeight()}</div> 
            <div><span>Tara: </span>{weights.getTara()}</div>
            <div><span>Sum: </span>{weights.getSum()}</div>
        </div>
    );
}

export default Weights;
