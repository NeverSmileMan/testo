import React, {FC, useState} from "react";
import "./Tab.css"

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
}

const styleTab = {
	borderTopLeftRadius: '10px',
	borderTopRightRadius: '10px',
	padding: '10px',
	background: 'aqua',
	width: '50px',
	height: '40px',
	fontSize: '25px'
}

const Tab: FC<ITab> = (...props) => {


	console.log(props)

	const [number, setNumber] = useState(1)
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

	return <button style={styleTab}>{number}</button>

}
export default Tab;