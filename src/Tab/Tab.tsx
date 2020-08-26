import React, {useState} from "react";


interface Item {

}

export default function Tab() {

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