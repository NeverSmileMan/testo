import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles';

import WeightsObject from '../../data.structure/Weights';
const weights = WeightsObject.getInstance();

const useStyles = makeStyles({
	grid: {
    width: '100%', 
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: '25% 75%',
    backgroundColor: '#e4e4e4',
  },
  title: {
    gridColumn:' 1 / 4',
    gridRow: '1',
    //backgroundColor: 'white',
    border: '1px solid white',
  },
  tara: {
    gridColumn: '1 / 2',
    gridRow: '2',
    //backgroundColor: 'white',
    border: '1px solid white',
  },
  weight: {
    gridColumn: '2 / 3',
    gridRow: '2',
    //backgroundColor: 'white',
    border: '1px solid white',
  },
  price: {
    gridColumn: '3 / 4',
    gridRow: '2',
    //backgroundColor: 'white',
    border: '1px solid white',
  },
  total: {
    gridColumn: '4 / 5',
    gridRow: '1 / 3',
    //backgroundColor: 'white',
    border: '1px solid white',
  },

});


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
      <div className={classes.title }>
        Title
        <span style={{fontSize: '25px', marginLeft: '10%'}}>
        {'title'}
        </span>
      </div>
      <div className={classes.tara }>
        Tapa
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {weights.getTara()}
        </div>
      </div>
      <div className={classes.weight }>
       weight
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {weights.getWeight()}
        </div>
      </div>
      <div className={classes.price }>
       price
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {'price'}
        </div>
      </div>
      <div className={classes.total }>
       Total
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {weights.getSum()}
        </div>
      </div>
    </div>
  )
}
