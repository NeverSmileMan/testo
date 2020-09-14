import React, { useState } from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/weights/WeightsDisplay';
import Weights from '../../data.structure/Weights';

const weights = Weights.getInstance();

let setState: React.Dispatch<{}>;
const changeState = () => {
    weights.onChange(
        () => setState({})
    );
    return {};
};

function WeightsDisplay({ classes }: WithStyles) {

    [, setState] = useState(changeState);

    return (
        <div className={classes.grid + ' border'}>
            <div className='title border'>title
                <span className='val'>
                    {weights.__getTitle()}
                </span>
            </div>
            <div className='tara border'>tara
                <div className='val'>
                    {weights.getTara().toFixed(3)}
                </div>
            </div>
            <div className='weight border'>weight
                <div className='val'>
                    {weights.getWeight().toFixed(3)}
                </div>
            </div>
            <div className='price border'>price
                <div className='val'>
                    {weights.__getPrice().toFixed(2)}
                </div>
            </div>
            <div className='total border'>total
                <div className='val'>
                    {weights.getSum().toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(WeightsDisplay);
