import React, { useCallback, useEffect, useState } from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';
import { useHints } from '../hint/hint.provider'
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";
import { ItemTypes } from '../../enum/item.types';

export interface TabItems {
	tabNumber: number;
	tara: number;
	items: AddedItem[];
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
	type: ItemTypes;
}

export interface AddedItem extends Item {
	amount: number;
	cost: number;
}

export interface ArgAddItemFunc {
	item: Item,
	calcValue?: number
}

interface Params {
	tabItems: Array<TabItems>
	activeTab: number,
	activeItem: AddedItem | null,
	setActiveTab: React.Dispatch<React.SetStateAction<number>>,
	setActiveItem: React.Dispatch<React.SetStateAction<AddedItem | null>>,
	addItem: ( { item, calcValue }: ArgAddItemFunc ) => boolean,
	deleteItem: () => void,
	createTab: () => void,
	deleteTab: ( id: number ) => void,
	setTara: ( tara: number ) => void,
	print: () => void,
	getTara: () => number | null,
}

export function useTabs( scaleService: any, ): Params {
	const { changeHint, Hints } = useHints();
	const [ tabItems, setTabItems ] = useState<TabItems[]>( [] );
	const [ activeTab, setActiveTab ] = useState<number>( 0 );
	const [ activeItem, setActiveItem ] = useState<AddedItem | null>( null );
	const [ freeTabNumbers, setFreeTabNumbers ] = useState<Array<boolean>>( () => Array( MAX_NUMBER_OF_TABS ).fill( false ) );

	const setTara = useCallback( ( tara ) => {
		if ( scaleService.checkStable() ) {
			scaleService.setTara( tara / 1000 )
			scaleService.setWeight( -tara / 1000 )
		}
		tabItems[activeTab].tara = tara;
		setTabItems( [ ...tabItems ] );

	}, [ tabItems, activeTab ] );

	const getTara = useCallback( () => {
		if ( !!tabItems.length ) {
			return (tabItems[activeTab].tara) / 1000
		}
		return null
	}, [ tabItems, activeTab ] );

	const addItem = useCallback(
		( { item, calcValue }: ArgAddItemFunc ) => {
			if ( scaleService.checkStable() ) {
				const addedItem = { ...item } as AddedItem;
				scaleService.setTitle( item.texts.full_title );
				scaleService.setPrice( item.price );
				const weightScale = scaleService.getItemWeight();
				if ( weightScale >= (40 / 1000) ) {
					switch ( item.type ) {
						case ItemTypes.COUNTED:
							if ( calcValue ) {
								addedItem.amount = calcValue;
								addedItem.cost = addedItem.amount * item.price;
							} else {
								changeHint( Hints.PickItemsQty );
								return false;
							}
							break;
						case ItemTypes.WEIGHED:
							addedItem.amount = weightScale;
							addedItem.cost = scaleService.getItemCost();
							break;
						default:
							changeHint( Hints.IncorrectItemType, true );
							return false;
					}
				} else {
					changeHint( Hints.MinWeight, true );
					return false;
				}
				tabItems[activeTab].items.push( addedItem );
				setTabItems( [ ...tabItems ] );
				ActiveInputService.clear();
				return true;
			}
			return false;
		}
		, [ tabItems, activeTab ],
	);

	const deleteItem = useCallback( () => {
		tabItems[activeTab].items = tabItems[activeTab].items.filter( ( item ) => item !== activeItem );
		setTabItems( [ ...tabItems ] );
		setActiveItem( null );
	}, [ tabItems, activeItem ] );

	useEffect( () => {
		const tara = getTara()
		scaleService.setTara( tara )
		if ( tara && tara < scaleService.getItemWeight ) {
			changeHint( Hints.MinWeight, true )
		}
	}, [ activeTab ] )

	const print = useCallback( () => {
		console.log( 'print', tabItems[activeTab].items )
	}, [ activeTab, tabItems ] );

	const createTab = useCallback( () => {
		const num = freeTabNumbers.findIndex( ( item ) => !item ) + 1;
		setFreeTabNumbers( ( prevState ) => {
			const arrBool = prevState;
			arrBool[num - 1] = true;
			return arrBool;
		} );
		setTabItems( ( prevState ) => [
			...prevState,
			{
				tabNumber: num,
				tara: 0,
				items: [],
			},
		] );
		setActiveTab( tabItems.length );
	}, [ tabItems ] );

	const deleteTab = useCallback( ( id: number ) => {
		setFreeTabNumbers( ( prevState ) => {
			const arrBool = prevState;
			const freeTabNum = tabItems[id].tabNumber - 1;
			arrBool[freeTabNum] = false;
			return arrBool;
		} );
		setTabItems( ( prevState ) => prevState.filter( ( value, index ) => index !== id ) );
		setActiveTab( ( prevTabNum ) => (prevTabNum ? prevTabNum - 1 : 0) );
	}, [ tabItems ] );

	useEffect(()=>{
		console.log(tabItems)
	},[tabItems])

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
		getTara
	}
}