import React, {useCallback, useState} from 'react';
import {MAX_NUMBER_OF_TABS} from './Tabs';
import {ActiveInputService} from '../services/ActiveInputService';

export interface TabItems {
	tabNumber: number;
	tara: number;
	items: AddedItem[];
}

interface Item {
	code: string;
	name: string;
	price: number;
	type: 'ваговий' | 'штучний'; //поменять?
}

interface AddedItem extends Item {
	amount: number;
	cost: number;
}

export function useTabs(
	setError: any,
	setModal: any,
	scaleService: any,
	CalcValue: number,
): [
	TabItems[],
	number,
		AddedItem | null,
	React.Dispatch<React.SetStateAction<number>>,
	React.Dispatch<React.SetStateAction<AddedItem | null>>,
	(item: Item) => boolean,
	() => void,
	() => void,
	() => void,
	() => void,
	() => void,
] {
	const [tabItems, setTabItems] = useState<TabItems[]>([{tabNumber: 1, tara: 0, items: [],},] as TabItems[]);
	const [activeTab, setActiveTab] = useState<number>(0);
	const [activeItem, setActiveItem] = useState<AddedItem | null>(null);
	const [freeTabNumbers, setFreeTabNumbers] = useState(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false);
		arr[0] = true;
		return arr;
	});

	const setTara = useCallback(() => {
		if (scaleService.checkStable()) {
			scaleService.setTara(CalcValue / 1000)
			scaleService.setWeight(-CalcValue / 1000)
		}
		tabItems[activeTab].tara = CalcValue
		setTabItems([...tabItems])
	}, [tabItems, CalcValue]);

	const getTara = useCallback(() => {
		return tabItems[activeTab].tara
	}, [tabItems, activeTab]);

	// const { CalcValue } = useContext(MainContext);
	// useEffect(submitValueCalc())
	const addItem = useCallback(
		(item: Item) => {
			if (scaleService.checkStable()) {
				const addedItem = {...item} as AddedItem;
				scaleService.setTitle(item.name);
				scaleService.setPrice(item.price);
				switch (item.type) {
					case 'штучний':
						setModal('qtyGoods');
						addedItem.amount = CalcValue; //---------------------------- тут как?
						addedItem.cost = addedItem.amount * item.price;
						break;
					case 'ваговий':
						const weightScale = scaleService.getItemWeight()
						if ( weightScale >= (40 / 1000)) {
							const price = +(weightScale * addedItem.price).toFixed(2)
							addedItem.amount = weightScale;
							addedItem.cost = scaleService.getItemCost(price);
						} else {
							setError('Вага повинна перевищувати 40 грам');
							return false;
						}
						break;
					default:
						setError('Невірний тип товару');
						return false;
				}
				tabItems[activeTab].items.push(addedItem);
				setTabItems([...tabItems]);
				ActiveInputService.clear();
				return true;
			}
			return false;
		},
		[tabItems, activeTab, CalcValue],
	);

	const deleteItem = useCallback(() => {
		tabItems[activeTab].items = tabItems[activeTab].items.filter((item) => item !== activeItem);
		setTabItems([...tabItems]);
		setActiveItem(null);
	}, [tabItems, activeItem]);

	// const createOrder = useCallback(() => {}, []);
	// const closeOrder = useCallback(() => {}, []);

	const print = useCallback(() => {
		console.log('print', tabItems[activeTab].items)
	}, [activeTab, tabItems]);

	const addTab = useCallback(() => {
		if (scaleService.checkStable()) {
			scaleService.setTara(0)
			scaleService.setWeight((0).toFixed(3))
			scaleService.setPrice((0).toFixed(2))
			scaleService.setTotal((0).toFixed(2))
		}

		const num = freeTabNumbers.findIndex(item => !item) + 1
		setFreeTabNumbers((prevState) => {
			prevState[num - 1] = true;
			return prevState
		})
		setTabItems((prevState) => [...prevState, {
			tabNumber: num,
			tara: 0,
			items: [],
		}])
		setActiveTab(tabItems.length)
	}, [tabItems, freeTabNumbers])

	const deleteTab = useCallback(() => {
		console.log('1>', 'we a here')
		if (tabItems.length === 1) {
			if (tabItems[0].tabNumber === 1) return
			else {
				setFreeTabNumbers((prevState) => {
					prevState[0] = true;
					return prevState
				})
				setTabItems((prevState) => [...prevState, {
					tabNumber: 1,
					tara: 0,
					items: [],
				}])
			}
		}
		setFreeTabNumbers((prevState) => {
			prevState[tabItems[activeTab].tabNumber - 1] = false;
			return prevState
		})
		setTabItems((prevState) => prevState.filter((value, index) => index !== activeTab));
		setActiveTab((prevTabNum) => prevTabNum ? prevTabNum - 1 : 0);
	}, [tabItems, activeTab])

	return [
		tabItems,
		activeTab,
		activeItem,
		setActiveTab,
		setActiveItem,
		addItem,
		deleteItem,
		addTab,
		deleteTab,
		setTara,
		print
	];
}