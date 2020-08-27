import React, {FC, useState} from "react";


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
	tara: number;
	addItem: (value: Item) => void;
	deleteItem: (value: Item) => void;
	getTotal: () => number;
	getTara: () => number;
}

const Tab: FC<ITab> = () => {

	const [number, setNumber] = useState(0)
	const [tara, setTara] = useState(0)
	const [items, setItems] = useState([{}])
	const [selectedItem, setSelectedItem] = useState({})


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


	return (
		<div>TAB</div>
	)
}
export default Tab;