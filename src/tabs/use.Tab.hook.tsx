import React, { useCallback, useEffect, useState } from 'react';
import { ActiveInputService } from '../services/ActiveInputService';
import { Hints } from '../custom/variables';


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

interface TabId {
	id: number;
}

export function useTabs(
	setHint: ( str: Hints, likeError?: boolean ) => void,
	scaleService: any,
	calcValue: number,
): [
	TabItems[],
	number,
		AddedItem | null,
	React.Dispatch<React.SetStateAction<number>>,
	React.Dispatch<React.SetStateAction<AddedItem | null>>,
	( { item, calcValue }: ArgAddItemFunc ) => boolean,
	() => void,
	() => void,
	() => void,
	( tara: number ) => void, // setTara
	() => void, // print
	() => number // getTara
] {

	const _apiBase = `http://10.13.16.80:4445`;


	const [ tabs, setTabs ] = useState<Array<TabId>>( [] )

	useEffect( () => {
		fetch( `${ _apiBase }/tab/list` )
		.then( ( res ) => res.json() )
		.then( value => setTabs( value ) )
	}, [] )

	const [ tabItems, setTabItems ] = useState<TabItems[]>( [ { tabNumber: 1, tara: 0, items: [] } ] as TabItems[] );
	const [ activeTab, setActiveTab ] = useState<number>( 0 );
	const [ activeItem, setActiveItem ] = useState<AddedItem | null>( null );

	const setTara = useCallback( ( tara ) => {
		tabItems[activeTab].tara = tara;
		setTabItems( [ ...tabItems ] );
	}, [ tabItems, activeTab ] );
	const getTara = useCallback( () => {
		return (tabItems[activeTab].tara) / 1000
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
						case ItemTypes.piece:
							if ( calcValue ) {
								addedItem.amount = calcValue;
								addedItem.cost = addedItem.amount * item.price;
							} else {
								setHint( Hints.PickItemsQty );
								return false;
							}
							break;
						case ItemTypes.weights:
							addedItem.amount = weightScale;
							addedItem.cost = scaleService.getItemCost();
							break;
						default:
							setHint( Hints.IncorrectItemType, true );
							return false;
					}
				} else {
					setHint( Hints.MinWeight, true );
					return false;
				}
				tabItems[activeTab].items.push( addedItem );
				setTabItems( [ ...tabItems ] );
				ActiveInputService.clear();
				return true;
			}
			return false;
		}
		,
		[ tabItems, activeTab ],
	);
	const deleteItem = useCallback( () => {
		tabItems[activeTab].items = tabItems[activeTab].items.filter( ( item ) => item !== activeItem );
		setTabItems( [ ...tabItems ] );
		setActiveItem( null );
	}, [ tabItems, activeItem ] );

	const print = useCallback( () => {
		console.log( '-------------------------' )
		console.log( 'print', tabItems[activeTab].items )
		console.log( '-------------------------' )
	}, [ activeTab, tabItems ] );

	const createTab = useCallback( () => {
		fetch( `${ _apiBase }/create-tab`, {
			method: 'POST'
		} )
		.then( ( res ) => res.json() )
		.then( ( tabId: any ) => setTabs( prevState => {
			if ( !tabId.id ) return prevState
			return [ ...prevState, tabId.id ]
		} ) )
	}, [] )

	const deleteTab = useCallback( () => {
		const id = 2
		fetch( `${ _apiBase }/delete-tab`, {
			method: 'DELETE',
			body: JSON.stringify( { "id": `${ id }` } ),
			headers: { 'Content-type': 'application/json' }
		} )
		.then( ( res ) => res.json() )
		.then( ( res: any ) => setTabs( ( prevState ) => {
			console.log( res )
			if ( !res.affected ) {
				return prevState
			}
			return prevState.filter( ( num ) => num.id !== id )
		} ) )
	}, [] )

	useEffect( () => {
		console.log( tabs )
	}, [ tabs ] )

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