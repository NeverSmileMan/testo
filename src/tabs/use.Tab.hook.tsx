import React, {useCallback, useState} from 'react';
import {MAX_NUMBER_OF_TABS} from './Tabs';
import {ActiveInputService} from '../services/ActiveInputService';
import {Hints, ItemTypes} from '../custom/variables';

export interface TabItems {
	tabNumber: number;
	tara: number;
	items: AddedItem[];
}

interface Item {
	code: string;
	name: string;
	price: number;
	type: ItemTypes;
}

interface AddedItem extends Item {
	amount: number;
	cost: number;
}

export interface ArgAddItemFunc {
	item: Item,
	calcValue?: number
}

export function useTabs(
	setHint: (str: Hints, likeError?: boolean) => void,
	scaleService: any,
	calcValue: number,
): [
	TabItems[],
	number,
		AddedItem | null,
	React.Dispatch<React.SetStateAction<number>>,
	React.Dispatch<React.SetStateAction<AddedItem | null>>,
	({item, calcValue}: ArgAddItemFunc) => boolean,
	() => void,
	() => void,
	() => void,
	(tara: number) => void,
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

	const setTara = useCallback((tara: number) => {
		if (scaleService.checkStable()) {
			scaleService.setTara(tara / 1000)
			scaleService.setWeight(-tara / 1000)
		}
		tabItems[activeTab].tara = tara;
		setTabItems([...tabItems]);
	}, [tabItems, activeTab]);


	const getTara = useCallback(() => {
		return tabItems[activeTab].tara
	}, [tabItems, activeTab]);

	const addItem = useCallback(
		({item, calcValue: calcValue}: ArgAddItemFunc) => {
			if (scaleService.checkStable()) {
				const addedItem = {...item} as AddedItem;
				scaleService.setTitle(item.name);
				scaleService.setPrice(item.price);
				const weightScale = scaleService.getItemWeight();
				if (weightScale >= (40 / 1000)) {
					switch (item.type) {
						case ItemTypes.piece:
							if (calcValue) {
								addedItem.amount = calcValue;
								addedItem.cost = addedItem.amount * item.price;
							} else {
								setHint(Hints.PickItemsQty);
								return false;
							}
							break;
						case ItemTypes.weights:
							const price = +(weightScale * addedItem.price).toFixed(2)
							addedItem.amount = weightScale;
							addedItem.cost = scaleService.getItemCost(price);
							break;
						default:
							setHint(Hints.IncorrectItemType, true);
							return false;
					}
				} else {
					setHint(Hints.MinWeight, true);
					return false;
				}
				tabItems[activeTab].items.push(addedItem);
				setTabItems([...tabItems]);
				ActiveInputService.clear();
				return true;
			}
			return false;
		}
		,
		[tabItems, activeTab],
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