import React, { useContext, useCallback } from 'react';
import AddedGoods from './added.goods';
import AddedGoods2 from './added.goods2';

import { makeStyles } from '@material-ui/styles';
import { ValuesContext } from '../App';

const useStyles = makeStyles({
	test: {
		height: '600px',
		width: '90%',
	},
	test2: {
		height: '17%',
	},
});

export default function Test() {
	const classes = useStyles();
	const contextValues = useContext(ValuesContext);

	const onClick = useCallback((e: React.MouseEvent) => {
		contextValues.setActive(+e.currentTarget.id);
	}, [contextValues.currentTargetId]);

	return (
		<div className={classes.test}>
			<div className={classes.test2}>
				{contextValues.currentTargetId === -1 ? <span>not today</span>:<button onClick={contextValues.deleteActive}>DELETE</button> }
				
				<button onClick={contextValues.add}>ADD</button>
			</div>
			<AddedGoods values={contextValues.state} onClick={onClick} active={contextValues.currentTargetId} />
			{/* <AddedGoods2 values={contextValues.state} onClick={onClick} active={contextValues.currentTargetId} /> */}
		</div>
	);
}
