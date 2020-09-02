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
}

const Tab: FC = ({children}) => {


	const [number, setNumber] = useState(children)
	const [tara, setTara] = useState(0)
	const [items, setItems] = useState([{}]) // список товарів
	const [selectedItem, setSelectedItem] = useState({}) //вибраний товар

	const setActive = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		// setActiveTab(activeTab)
		// Input.clear()
		console.log(e.target)
	}, [])

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

	return <button onClick={setActive} className='tab'>{number}</button>

}
export default Tab;