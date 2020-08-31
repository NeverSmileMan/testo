import React, { useCallback, useState } from 'react';
import AddedItemsTable from '../added.items.table/added.items.table';
import Keyboard, { keyBoard } from '../keyboard/keyboard';
import { ActiveInputServise } from '../services/ActiveInputServise';
import { makeStyles } from '@material-ui/styles';
import SearchInput from '../search.input/search.input';

//----------------------------------------------
type ItemType = 'ваговий' | 'штучний'; // заменить

export interface Item {
	//import need
	code: string;
	name: string;
	amount: number;
	cost: number;
	type: ItemType;
}
export const values: Array<Item> = [
	//import need
	{
		code: '1111',
		name: 'title1',
		amount: 11,
		cost: 111,
		type: 'ваговий',
	},
	{
		code: '2',
		name: 'title1',
		amount: 22,
		cost: 222,
		type: 'штучний',
	},
	{
		code: '3',
		name: 'title1',
		amount: 33,
		cost: 333,
		type: 'ваговий',
	},
	{
		code: '4',
		name: 'title1',
		amount: 44,
		cost: 444,
		type: 'штучний',
	},
];

//----------------------------------------------

const useStyles = makeStyles({
	test: {
		height: '17%',
	},
	test0: {
		height: '60%',
	},
});

export default function Test(): React.ReactElement {
	const classes = useStyles();

	return (
		<>
			<div className={classes.test0}>
				<div className={classes.test}>
					<SearchInput />
				</div>
				<AddedItemsTable values={values} onClick={'onClick' as any} active={null} />
			</div>
			<Keyboard service={ActiveInputServise} keyboardLayout={keyBoard} options={{}} />
		</>
	);
}
