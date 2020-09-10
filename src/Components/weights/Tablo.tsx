import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';

import WeightsObject from '../../data.structure/Weights';
const weights = WeightsObject.getInstance();

const useStyles = makeStyles((theme: Theme) => ({
    grid: {
        width: '100%', 
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '25% 75%',
        backgroundColor: '#e4e4e4',
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

export default function Tablo() {
  const classes = useStyles();

// const [title, setTitle] = React.useState();
// const [tara, setTara] = React.useState();
// const [weight, setWeight] = React.useState();
// const [price, setPrice] = React.useState();
// const [total, setTotal] = React.useState();

    const [, setState] = useState({});

    useState(() => {
        weights.on('stateChange', () =>
            setState({}))
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
                    {weights.getTara()}
                </div>
            </div>
            <div className='weight'>weight
                <div className='val'>
                    {weights.getWeight()}
                </div>
            </div>
            <div className='price'>price
                <div className='val'>
                    {weights.__getPrice()}
                </div>
            </div>
            <div className='total'>total
                <div className='val'>
                    {weights.getSum()}
                </div>
            </div>
        </div>
    );
}
