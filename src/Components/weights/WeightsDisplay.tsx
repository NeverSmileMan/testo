import React, { useState } from 'react'
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import Weights from '../../data.structure/Weights';

const weights = Weights.getInstance();

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
            border: '1px solid white',
            display: 'flex',
        },
        '& .tara': {
            gridColumn: '1/2',
            gridRow: '2',
            border: '1px solid white',
        },
        '& .weight': {
            gridColumn: '2/3',
            gridRow: '2',
            border: '1px solid white',
        },
        '& .price': {
            gridColumn: '3/4',
            gridRow: '2',
            border: '1px solid white',
        },
        '& .total': {
            gridColumn: '4/5',
            gridRow: '1/3',
            border: '1px solid white',
        },
    },
}));

function WeightsDisplay({ classes }: WithStyles) {

    const [, setState] = useState(() => {
        weights.onChange(() =>
            setState({}));
        return {};
    });

    return (
        <div className={classes.grid }>
            <div className='title xxx'>title
                <span className='val'>
                    {weights.__getTitle()}
                </span>
            </div>
            <div className='tara'>tara
                <div className='val'>
                    {weights.getTara().toFixed(3)}
                </div>
            </div>
            <div className='weight'>weight
                <div className='val'>
                    {weights.getWeight().toFixed(3)}
                </div>
            </div>
            <div className='price'>price
                <div className='val'>
                    {weights.__getPrice().toFixed(2)}
                </div>
            </div>
            <div className='total'>total
                <div className='val'>
                    {weights.getSum().toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(WeightsDisplay);
