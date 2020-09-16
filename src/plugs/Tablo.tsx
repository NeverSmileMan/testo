import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/styles';
import {ScalePlug} from './scale'
import {MainContext} from "../main";

const useStyles = makeStyles({
	grid: {
		width: '80%',
		height: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',
		gridTemplateRows: '25% 75%',

	},
	title: {
		gridColumn: ' 1 / 4',
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
	const {activeTara} = useContext(MainContext)

	const [tara, setTara] = React.useState(activeTara);
	const [title, setTitle] = React.useState();
	const [price, setPrice] = React.useState((0).toFixed(2));
	const [weight, setWeight] = React.useState<any>((0).toFixed(3));
	const [total, setTotal] = React.useState((0).toFixed(2));


	useEffect(() => {
		ScalePlug.setFuncs(setTara, setTitle, setPrice, setWeight, setTotal);
	}, [tara, title, price, weight, total, activeTara])

	const styleScale = {
		fontSize: '2em',
		display: 'flex',
		alignItems: 'end',
		justifyContent: 'flex-end',
		fontWeight: 700
	}

	return (
		<div className={classes.grid}>
			<div className={classes.title}>
				Title
				<span style={styleScale}>
        {title}
        </span>
			</div>
			<div className={classes.tara}>
				Tapa
				<div style={styleScale}>
					{tara}
				</div>
			</div>
			<div className={classes.weight}>
				weight
				<div style={styleScale}>
					{weight}
				</div>
			</div>
			<div className={classes.price}>
				price
				<div style={styleScale}>
					{price}
				</div>
			</div>
			<div className={classes.total}>
				Total
				<div style={styleScale}>
					{total}
				</div>
			</div>
		</div>
	)
}
