import React, { useState } from 'react';
import WeightsObject from '../data.structure/Weights';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'weights': {
        backgroundColor: 'green',
    }
});

const weights = WeightsObject.getInstance();

function Weights() {
    const classes = useStyle();

    const [, setState] = useState({});

    useState(() => {
        weights.on('stateChange', () =>
            setState({}))
    });

    const className = classes.weights + ' weights';

    return (
        <div className={className}>
            <div className='title'>WEIGHTS</div>
            <div><span>Weight: </span>{weights.getWeight()}</div> 
            <div><span>Tara: </span>{weights.getTara()}</div>
            <div><span>Sum: </span>{weights.getSum()}</div>
        </div>
    );
}

export default Weights;
