import React, { useContext } from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/weights/WeightsDisplay';

import { WeightsContext } from '../Main';

function WeightsDisplay({ classes }: WithStyles) {

    const { title, tara, weight, price, sum } = useContext(WeightsContext);

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
