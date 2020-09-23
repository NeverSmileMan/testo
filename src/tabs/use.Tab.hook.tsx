import React, {useCallback, useEffect, useState} from 'react';
import {ActiveInputService} from '../services/ActiveInputService';
import {Hints, MAX_NUMBER_OF_TABS} from '../custom/variables';
import {useHints} from '../tabs/hint/hint.provider'


export interface TabItems {
	tabNumber: number;
	tara: number;
	items: AddedItem[];
}


enum ItemTypes {
	weights = 'weighed',
	piece = 'pieced',
}
interface Defaults {
	tara: number;
	pieces_per_package: number;
}
interface Lifetime {
	shelf_life_1: number;
}
interface Texts {
	article: string;
	full_title: string;
	shop: string;
	short_title: string;
}
export interface Item {
	defaults: Defaults;
	id: string;
	lifetime: Lifetime;
	plu: number;
	price: number;
	searchIndex: string;
	texts: Texts;
	type: 'pieced' | 'weighed';
}

export interface AddedItem extends Item {
	amount: number;
	cost: number;
}

export interface ArgAddItemFunc {
	item: Item,
	calcValue?: number
}

export function useTabs(
	scaleService: any,
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
	(tara: number) => void, // setTara
	() => void, // print
	() => number // getTara
] {
	const { changeHint, Hints } = useHints();
	const [tabItems, setTabItems] = useState<TabItems[]>([{tabNumber: 1, tara: 0, items: []}] as TabItems[]);
	const [activeTab, setActiveTab] = useState<number>(0);
	const [activeItem, setActiveItem] = useState<AddedItem | null>(null);
	const [freeTabNumbers, setFreeTabNumbers] = useState<Array<boolean>>(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false);
		arr[0] = true;
		return arr;
	});

	const setTara = useCallback((tara) => {
		if (scaleService.checkStable()) {
			scaleService.setTara(tara / 1000)
			scaleService.setWeight(-tara / 1000)
		}
		tabItems[activeTab].tara = tara;
		setTabItems([...tabItems]);
	}, [tabItems, activeTab]);

	const getTara = useCallback(() => {
		return (tabItems[activeTab].tara) / 1000
	}, [tabItems, activeTab]);

	const addItem = useCallback(
		({item, calcValue}: ArgAddItemFunc) => {
			if (scaleService.checkStable()) {
				const addedItem = {...item} as AddedItem;
				scaleService.setTitle(item.texts.full_title);
				scaleService.setPrice(item.price);
				const weightScale = scaleService.getItemWeight();
				if (weightScale >= (40 / 1000)) {
					switch (item.type) {
						case ItemTypes.piece:
							if (calcValue) {
								addedItem.amount = calcValue;
								addedItem.cost = addedItem.amount * item.price;
							} else {
								changeHint(Hints.PickItemsQty);
								return false;
							}
							break;
						case ItemTypes.weights:
							addedItem.amount = weightScale;
							addedItem.cost = scaleService.getItemCost();
							break;
						default:
							changeHint(Hints.IncorrectItemType, true);
							return false;
					}
				} else {
					changeHint(Hints.MinWeight, true);
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

	useEffect(() => {
		const tara = getTara()
		scaleService.setTara(tara)
		if (tara < scaleService.getItemWeight) {
			changeHint(Hints.MinWeight, true)
		}
	}, [activeTab])

	const print = useCallback(() => {
		console.log('-------------------------')
		console.log('print', tabItems[activeTab].items)
		console.log('-------------------------')
	}, [activeTab, tabItems]);

	const createTab = useCallback(() => {
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
			if (tabItems[0].tabNumber === 1) {
				tabItems[0].items = []
				return
			} else {
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
		createTab,
		deleteTab,
		setTara,
		print,
		getTara
	];
}