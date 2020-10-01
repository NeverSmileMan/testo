
import React, { useCallback, useEffect, useState } from 'react';
import { useHints } from '../hint/hint.provider';
import { ActiveInputService } from '../services/ActiveInputService';
import { ItemTypes } from '../../enum/item.types';
import { Item } from "../search.list/Item";

export interface TabItems {
	tabId: number;
	tara: number;
	items: AddedItem[];
}

export interface AddedItem extends Item {
	amount: number;
	cost: number;
}

export interface ArgAddItemFunc {
	item: Item;
	calcValue?: number;
}

interface Params {
	tabItems: Array<TabItems>;
	activeTab: number;
	activeItem: AddedItem | null;
	setActiveTab: React.Dispatch<React.SetStateAction<number>>;
	setActiveItem: React.Dispatch<React.SetStateAction<AddedItem | null>>;
	addItem: ({ item, calcValue }: ArgAddItemFunc) => boolean;
	deleteItem: () => void;
	createTab: () => void;
	deleteTab: (id: number) => void;
	setTara: (tara: number) => void;
	print: () => void;
	getTara: () => number | null;
}

const requestTab = (url: string, method: string, body?: string) => {
	return fetch(`http://10.13.16.80:4445/${url}`, {
		method,
		body,
		headers: { 'Content-type': 'application/json' },
	}).then((res) => res.json());
};

export function useTabs(scaleService: any): Params {
	const { changeHint, Hints } = useHints();
	const [tabItems, setTabItems] = useState<TabItems[]>([]);
	const [activeTab, setActiveTab] = useState<number>(0);
	const [activeItem, setActiveItem] = useState<AddedItem | null>(null);

	useEffect(() => {
		requestTab('tab/list', 'GET').then((arrTabs) => {
			arrTabs.map((value: any) => {
				setTabItems((prevState) => [
					...prevState,
					{
						tabId: value.id,
						tara: 0,
						items: [],
					},
				]);
				return true;
			});
		});
	}, []);

	const setTara = useCallback(
		(tara) => {
			if (scaleService.checkStable()) {
				scaleService.setTara(tara / 1000);
				scaleService.setWeight(-tara / 1000);
			}
			tabItems[activeTab].tara = tara;
			setTabItems([...tabItems]);
		},
		[tabItems, activeTab],
	);

	const getTara = useCallback(() => {
		if (tabItems.length) {
			return tabItems[activeTab].tara / 1000;
		}
		return null;
	}, [tabItems, activeTab]);

	const addItem = useCallback(
		({ item, calcValue }: ArgAddItemFunc) => {
			if (scaleService.checkStable()) {
				const addedItem = { ...item } as AddedItem;
				scaleService.setTitle(item.texts.full_title);
				scaleService.setPrice(item.price);
				const weightScale = scaleService.getItemWeight();
				if (weightScale >= 40 / 1000) {
					switch (item.type) {
						case ItemTypes.COUNTED:
							if (calcValue) {
								addedItem.amount = calcValue;
								addedItem.cost = addedItem.amount * item.price;
							} else {
								changeHint(Hints.PickItemsQty);
								return false;
							}
							break;
						case ItemTypes.WEIGHED:
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
		},
		[tabItems, activeTab],
	);

	const deleteItem = useCallback(() => {
		tabItems[activeTab].items = tabItems[activeTab].items.filter((item) => item !== activeItem);
		setTabItems([...tabItems]);
		setActiveItem(null);
	}, [tabItems, activeItem]);

	const print = useCallback(() => {
		console.log('print', tabItems[activeTab].items);
	}, [activeTab, tabItems]);

	const createTab = useCallback(() => {
		requestTab('create-tab', 'POST').then((id: any) => {
			setTabItems((prevState) => {
				if (!id.id) return prevState;
				return [
					...prevState,
					{
						tabId: id.id.id,
						tara: 0,
						items: [],
					},
				];
			});
		});
		setActiveTab(tabItems.length);
	}, [tabItems, activeTab]);

	const deleteTab = useCallback(() => {
		const body = JSON.stringify({ id: `${tabItems[activeTab].tabId}` });
		requestTab('delete-tab', 'DELETE', body).then((res: any) => {
			setTabItems((prevState) => {
				if (!res.affected) return prevState;
				return prevState.filter((tab, index) => index !== activeTab);
			});
		});
		setActiveTab((prevTabNum) => (prevTabNum ? prevTabNum - 1 : 0));
	}, [tabItems, activeTab]);

	return {
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
		getTara,
	};
}
