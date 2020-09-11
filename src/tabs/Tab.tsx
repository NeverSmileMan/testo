import React, {FC, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import {MAX_NUMBER_OF_TABS} from "./Tabs";
import {createStyles, Theme} from "@material-ui/core/";

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
	active: boolean
	index: number
}

const styles = makeStyles((theme: Theme) => createStyles({
	tab_style: {
		marginRight: '.2rem',
		width: `calc((100% - 1.6rem) / ${MAX_NUMBER_OF_TABS})`,
		height: '100%',
		borderRadius: '.3rem .3rem 0 0',
		fontSize: '1.2em',
		fontWeight: 'bolder',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e4e4e4',
		color: '#333',
		border: 'none',
	},
	tab_active: {
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		outline: 'none',
	}
}))

const Tab: FC<PropsTab> = ({tab, setActive, active, index}) => {

	const [number, setNumber] = useState(tab.tabNumber)
	const [tara, setTara] = useState(0)
	const [items, setItems] = useState([{}]) // список товарів
	const [selectedItem, setSelectedItem] = useState({}) //вибраний товар
	const {tab_style, tab_active} = styles()

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

	return <div id={`${index}`}
	            onClick={setActive}
	            className={`${tab_style} ${active ? tab_active : ''}`}>
		{tab.tabNumber}
	</div>

}
export default Tab;