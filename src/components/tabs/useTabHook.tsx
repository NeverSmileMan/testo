import React, { useCallback, useEffect, useState } from 'react';
import { ActiveInputService } from '../../enum/ActiveInputService';
import { useHints } from '../hint/hint.provider'
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

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

interface TabId {
	id: number
}

const defaultIdTabsFromServer: Array<TabId> = [
	{ id: 3 },
	{ id: 4 },
	{ id: 1 }
]

export function useTabs( scaleService: any, ): Params {
	const { changeHint, Hints } = useHints();
	const [ tabItems, setTabItems ] = useState<TabItems[]>( [] );
	const [ activeTab, setActiveTab ] = useState<number>( 0 );
	const [ activeItem, setActiveItem ] = useState<AddedItem | null>( null );
// ================================================================================================================
	const [ defaultTab, setDefaultTab ] = useState<Array<TabId>>( defaultIdTabsFromServer )



	// const requestTab = ( url: string, method: string, body?: string ) => {
	// 	return fetch( `http://10.13.16.80:4445/${ url }`, {
	// 		method: method,
	// 		body: body,
	// 		headers: { 'Content-type': 'application/json' }
	// 	} )
	// 	.then( ( res ) => res.json() )
	// }
	//
	// useEffect( () => {
	// 	requestTab( 'tab/list', 'GET' )
	// 	.then( ( arrTabs ) => {
	// 		setTabs( arrTabs )
	// 		setActiveTab( () => {
	// 			if ( !arrTabs.length ) return 0;
	// 			return arrTabs[arrTabs.length - 1].id
	// 		} )
	// 	} )
	// }, [] )














	useEffect( () => {
		defaultTab.map( ( value ) => {
			setTabItems( ( prevState ) => [
				...prevState,
				{
					tabNumber: value.id,
					tara: 0,
					items: [],
				},
			] );
		} )

	}, [] )

//================================ delete ========================================
	const createRand = useCallback( (): number => {
		let randCount = Math.floor( (Math.random() * MAX_NUMBER_OF_TABS) + 1 );
		const hasId = ( element: any ) => element.id === randCount;
		if ( defaultTab.some( (hasId) ) ) return createRand();
		return randCount;
	}, [ defaultTab ] )
// ================================================================================================================

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
		const num = createRand()
		setDefaultTab( ( prevState ) => [ ...prevState, { id: num } ] )
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
		setDefaultTab( ( prevState ) => prevState.filter( ( value, index ) => index !== id ) );
		setTabItems( ( prevState ) => prevState.filter( ( value, index ) => index !== id ) );
		setActiveTab( ( prevTabNum ) => (prevTabNum ? prevTabNum - 1 : 0) );
	}, [ tabItems ] );

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

/*
const [ tabs, setTabs ] = useState<TabId[]>( [] )
const [ activeTab, setActiveTab ] = useState<number>( () => {
	if ( !tabs.length ) return 0;
	return tabs[0].id
} )

const requestTab = ( url: string, method: string, body?: string ) => {
	return fetch( `http://10.13.16.80:4445/${ url }`, {
		method: method,
		body: body,
		headers: { 'Content-type': 'application/json' }
	} )
	.then( ( res ) => res.json() )
}

useEffect( () => {
	requestTab( 'tab/list', 'GET' )
	.then( ( arrTabs ) => {
		setTabs( arrTabs )
		setActiveTab( () => {
			if ( !arrTabs.length ) return 0;
			return arrTabs[arrTabs.length - 1].id
		} )
	} )
}, [] )

const createTab = useCallback( () => {
	requestTab( 'create-tab', 'POST' )
	.then( ( tabId: any ) => setTabs( prevState => {
		if ( !tabId.id ) return prevState
		const newState = [ ...prevState, tabId.id ]
		setActiveTab( newState[newState.length - 1].id )
		return newState
	} ) )
}, [ activeTab, tabs ] )

const deleteTab = useCallback( () => {
	const body = JSON.stringify( { "id": `${ activeTab }` } )
	requestTab( 'delete-tab', 'DELETE', body )
	.then( ( res: any ) => setTabs( ( prevState ) => {
		if ( !res.affected ) return prevState
		const newState = prevState.filter( ( num ) => num.id !== activeTab )
		setActiveTab( () => {
			if ( !newState.length ) return 0;
			return newState[0].id
		} )
		return newState
	} ) )
}, [ activeTab, tabs ] )
*/
