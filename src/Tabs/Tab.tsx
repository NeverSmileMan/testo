import React, {FC, useCallback, useState} from "react";

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


	return <button id={tab.tabNumber.toString()}
	               onClick={setActive}
	               className={tab.active ? 'tab_active tab': 'tab'}>
				{number}
			</button>

}
export default Tab;