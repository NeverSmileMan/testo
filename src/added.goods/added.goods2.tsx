import React, { ReactElement, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import './added.goods.css';
import { ValuesContext } from '../App';

interface Props {
	values: any[];
	onClick: (e: any) => void;
	options?: any;
	active: number;
}

const useStyles = makeStyles({
	total: {
		width: '100%',
	},
});


function useForceUpdate(){
	const [value, setValue] = useState(new Set([1,2,5])); 
	return () => {
		let x = value;
		x.delete(5);
		setValue(new Set(x));
	}; 
}
// function useForceUpdate(){
// 	const [value, setValue] = useState(0); // integer state
// 	return () => setValue(value => ++value); // update the state to force render
// }




export default function AddedGoods({ values, onClick, options, active }: Props): ReactElement {
	const classes = useStyles(options);

	const forceUpdate = useForceUpdate();
	const contextValues = useContext(ValuesContext);
	return (
		<div className={classes.total + ' body-container'}>
			{Array.from(contextValues.state2).map((item, i) => {
				return (
					<div
						onClick={()=> {
							console.log(item);
							console.log(contextValues.state2.has(item));
							contextValues.deleteSetVal(item);
							forceUpdate();
						}}
						className={'body-item' + (active===i ? ' body-item-active' : '')}
						key={i}
					>
						<div className={'body-item-code body-item-font'}>{item.code}</div>
						<div className={'body-item-name body-item-font'}>{item.name}</div>
						<div className={'body-item-amount body-item-font'}>
							{item.amount}
							<span>{item.isWeight ? 'г.' : 'шт.'}</span>
						</div>
						<div className={'body-item-cost body-item-font'}>{item.cost}</div>
					</div>
				);
			})}
		</div>
	);
}
