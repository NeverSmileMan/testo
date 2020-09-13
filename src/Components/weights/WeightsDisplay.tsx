import React, { useState } from 'react'
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import Weights from '../../data.structure/Weights';

const styles = createStyles((theme: Theme) => ({
    'grid': {
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '25% 75%',
        backgroundColor: theme.palette.secondary.light,
        border: '1px solid white',
        color: theme.palette.primary.main,
        '& .val, span': {
            fontSize: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50%',
            color: 'grey',
        },
        '& span.val': {
            fontSize: '1.2rem',
            height: '100%',
            width: '100%',
        },
        '& .title': {
            gridColumn: '1/4',
            gridRow: '1',
            display: 'flex',
        },
        '& .tara': {
            gridColumn: '1/2',
            gridRow: '2',
        },
        '& .weight': {
            gridColumn: '2/3',
            gridRow: '2',
        },
        '& .price': {
            gridColumn: '3/4',
            gridRow: '2',
        },
        '& .total': {
            gridColumn: '4/5',
            gridRow: '1/3',
        },
        '& .border': {
            border: '1px solid white',
        },
    },
}));

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
