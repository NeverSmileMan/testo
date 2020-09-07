import React, {FC, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import { NUMBER_OF_TABS } from "./Tabs";

enum ItemType {
	WEIGHT,
	PIECE,
}

export interface Item {
	plu: number;
	name: string;
	price: number;
	type: ItemType;
}

export interface ITab {
	tabNumber: number;
	tara?: number;
	addItem?: (value: Item) => void;
	deleteItem?: (value: Item) => void;
	getTotal?: () => number;
	getTara?: () => number;
	active?: boolean
}


interface PropsTab {
	tab: ITab;
	setActive?: (e: any) => void;
	key?: number
}


const Tab: FC<PropsTab> = ({tab, setActive}) => {

	const [number, setNumber] = useState(tab.tabNumber)
	const [tara, setTara] = useState(0)
	const [items, setItems] = useState([{}]) // список товарів
	const [selectedItem, setSelectedItem] = useState({}) //вибраний товар

	const addItem = (item: Item) => {
	}
	const deleteItem = (item: Item) => {
	}
	const getTotal = () => {
	}
	const createOrderNumber = () => {
	}
	const closeOrder = () => {

	}
	const getTara = () => {
	}

	const styles = makeStyles({
		tab_style: {
			marginRight: '.2rem',
			width: `calc((100% - 1.6rem) / ${NUMBER_OF_TABS})`,
			height: '100%',
			borderRadius: '.3rem .3rem 0 0',
			fontSize: '1.3em',
			fontWeight: 'bolder',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#e4e4e4',
			color: '#333',
			border: 'none',
			padding: '.5rem 0',
		},
		tab_active: {
			marginRight: '.2rem',
			width: `calc((100% - 1.6rem) / ${NUMBER_OF_TABS})`,
			height: '100%',
			borderRadius: '.3rem .3rem 0 0',
			fontSize: '1.3em',
			fontWeight: 'bolder',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: 'none',
			padding: '.5rem 0',
			backgroundColor: '#09f',
			color: '#fff'
		}
	})

	const {tab_style, tab_active} = styles()

	return <button id={tab.tabNumber.toString()}
	               onClick={setActive}
	               className={tab.active ? tab_active : tab_style}>
		{number}
	</button>

}
export default Tab;