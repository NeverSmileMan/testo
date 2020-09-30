import React, { useCallback, useEffect, useState } from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';
import { useHints } from '../hint/hint.provider'

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

const requestTab = ( url: string, method: string, body?: string ) => {
	return fetch( `http://10.13.16.80:4445/${ url }`, {
		method: method,
		body: body,
		headers: { 'Content-type': 'application/json' }
	} )
	.then( ( res ) => res.json() )
}

export function useTabs( scaleService: any, ): Params {
	const { changeHint, Hints } = useHints();
	const [ tabItems, setTabItems ] = useState<TabItems[]>( [] );
	const [ activeItem, setActiveItem ] = useState<AddedItem | null>( null );
	const [ activeTab, setActiveTab ] = useState<number>( 0 )

	useEffect( () => {
		requestTab( 'tab/list', 'GET' )
		       .then( ( arrTabs ) => {
			       arrTabs.map( ( value: any ) => {
				       setTabItems( ( prevState ) => [
					       ...prevState,
					       {
						       tabNumber: value.id,
						       tara: 0,
						       items: [],
					       },
				       ] );
				       setActiveTab( arrTabs[arrTabs.length - 1].id )
			       } )
		       } )
	}, [] )

	const setTara = useCallback( ( tara ) => {
		if ( scaleService.checkStable() ) {
			scaleService.setTara( tara / 1000 )
			scaleService.setWeight( -tara / 1000 )
		}
		const activeTabItem = tabItems.find( value => value.tabNumber === activeTab )
		if ( activeTabItem ) {
			activeTabItem.tara = tara;
		}
		setTabItems( [ ...tabItems ] );

	}, [ tabItems, activeTab ] );

	const getTara = useCallback( () => {
		if ( !!tabItems.length ) {
			const activeTabItem = tabItems.find( value => value.tabNumber === activeTab )
			if ( activeTabItem ) {
				return activeTabItem.tara / 1000
			}
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
						case ItemTypes.piece:
							if ( calcValue ) {
								addedItem.amount = calcValue;
								addedItem.cost = addedItem.amount * item.price;
							} else {
								changeHint( Hints.PickItemsQty );
								return false;
							}
							break;
						case ItemTypes.weights:
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
				const activeTabItem = tabItems.find( value => value.tabNumber === activeTab )
				if ( activeTabItem ) {
					activeTabItem.items.push( addedItem );
					setTabItems( [ ...tabItems ] );
				}
				ActiveInputService.clear();
				return true;
			}
			return false;
		}
		, [ tabItems, activeTab, ],
	);

	const deleteItem = useCallback( () => {
		const activeTabItem = tabItems.find( value => value.tabNumber === activeTab )
		if ( activeTabItem ) {
			activeTabItem.items = activeTabItem.items.filter( ( item ) => item !== activeItem );
		}
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
		requestTab( 'create-tab', 'POST' )
		       .then( ( tabId: any ) => {
			       setTabItems( ( prevState ) => {
				       if ( !tabId.id ) return prevState
				       return [
					       ...prevState,
					       {
						       tabNumber: tabId.id.id,
						       tara: 0,
						       items: [],
					       },
				       ]
			       } );
			       setActiveTab( tabId.id.id )
		       } )
	}, [ tabItems, activeTab ] );

	const deleteTab = useCallback( ( id: number ) => {
		const body = JSON.stringify( { "id": `${ id }` } )
		requestTab( 'delete-tab', 'DELETE', body )
		       .then( ( res: any ) => {
			       setTabItems( ( prevState ) => {
				       if ( !res.affected ) return prevState
				       return prevState.filter( ( value ) => value.tabNumber !== id )
			       } )
		       } )
		setActiveTab( () => {
			console.log( tabItems )
			const actTab = tabItems[tabItems.length - 1].tabNumber;
			console.log(actTab)


			if ( !(tabItems.length - 1) ) return 0

			return tabItems[0].tabNumber
		} );
	}, [ tabItems, activeTab ]);


	useEffect( () => {
		// const tara = tabItems.find( value => value.tabNumber === activeTab )
		// console.log( tara )
		// console.log( tabItems )
		// console.log( activeTab )
	}, [ activeTab, tabItems ] )

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