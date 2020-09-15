import React, { useState } from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/weights/WeightsDisplay';
import Weights, { IStateWeights } from '../../data.structure/Weights';

let setState: React.Dispatch<() => IStateWeights>;
let state: IStateWeights;
const changeState = () => {
    const weights = Weights.getInstance();
    weights.onChange(() => setState(weights.getStateWeights.bind(weights)));
    return weights.getStateWeights();
};

function WeightsDisplay({ classes }: WithStyles) {

    [state, setState] = useState(changeState);
    const { title, tara, weight, price, sum } = state;
    return (
        <div className={classes.grid + ' border'}>
            <div className='title border'>title
                <span className='val'>
                    {title}
                </span>
            </div>
            <div className='tara border'>tara
                <div className='val'>
                    {tara.toFixed(3)}
                </div>
            </div>
            <div className='weight border'>weight
                <div className='val'>
                    {weight.toFixed(3)}
                </div>
            </div>
            <div className='price border'>price
                <div className='val'>
                    {price.toFixed(2)}
                </div>
            </div>
            <div className='total border'>total
                <div className='val'>
                    {sum.toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(WeightsDisplay);
