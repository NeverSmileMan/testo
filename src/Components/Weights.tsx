import React, { useState } from 'react';
import WeightsObject from '../data.structure/Weights';
import { makeStyles } from '@material-ui/core/styles';
import Tablo from './weights/WeightsDisplay';

const useStyle = makeStyles({
    'weights': {
        backgroundColor: '#e4e4e4',
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
            {/* <div className='title'>WEIGHTS</div>
            <div><span>Weight: </span>{weights.getWeight()}</div> 
            <div><span>Tara: </span>{weights.getTara()}</div>
            <div><span>Sum: </span>{weights.getSum()}</div> */}
            <Tablo />
        </div>
    );
}

export default Weights;
