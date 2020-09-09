import React from 'react'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
	grid: {
    width: '80%', 
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: '25% 75%',

  },
  title: {
    gridColumn:' 1 / 4',
    gridRow: '1',
    backgroundColor: 'white',
    border: '1px solid black',
  },
  tara: {
    gridColumn: '1 / 2',
    gridRow: '2',
    backgroundColor: 'white',
    border: '1px solid black',
  },
  weight: {
    gridColumn: '2 / 3',
    gridRow: '2',
    backgroundColor: 'white',
    border: '1px solid black',
  },
  price: {
    gridColumn: '3 / 4',
    gridRow: '2',
    backgroundColor: 'white',
    border: '1px solid black',
  },
  total: {
    gridColumn: '4 / 5',
    gridRow: '1 / 3',
    backgroundColor: 'white',
    border: '1px solid black',
  },

});


export default function Tablo() {
  const classes = useStyles();


const [title, setTitle] = React.useState();
const [tara, setTara] = React.useState();
const [weight, setWeight] = React.useState();
const [price, setPrice] = React.useState();
const [total, setTotal] = React.useState();





  return (
    <div className={classes.grid }>
      <div className={classes.title }>
        Title
        <span style={{fontSize: '25px', marginLeft: '10%'}}>
        {title}
        </span>
      </div>
      <div className={classes.tara }>
        Tapa
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {tara}
        </div>
      </div>
      <div className={classes.weight }>
       weight
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {weight}
        </div>
      </div>
      <div className={classes.price }>
       price
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {price}
        </div>
      </div>
      <div className={classes.total }>
       Total
        <div style={{fontSize: '25px', marginLeft: '25%'}}>
        {total}
        </div>
      </div>
    </div>
  )
}
