import React, { useCallback, useEffect, useState } from 'react';


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
	type: 'pieced' | 'weighed';
}

export interface AddedItem extends Item {
	amount: number;
	cost: number;
}

export interface TabId {
	id: number;
}

export function useTabs(): [
	TabId[],
	number,
	() => void,
	() => void,
	React.Dispatch<React.SetStateAction<number>>,
] {

	const _apiBase = `http://10.13.16.80:4445`;

	const [ tabs, setTabs ] = useState<Array<TabId>>( [] )
	const [ activeTab, setActiveTab ] = useState<number>( () => {
		if ( !tabs[0].id ) return 0;
		return tabs[0].id
	} )

	useEffect( () => {
		fetch( `${ _apiBase }/tab/list` )
		.then( ( res ) => res.json() )
		.then( ( value ) => {
			setTabs( value )
			setActiveTab( tabs[tabs.length - 1].id )
		} )
	}, [] )


	const createTab = useCallback( () => {
		fetch( `${ _apiBase }/create-tab`, {
			method: 'POST'
		} )
		.then( ( res ) => res.json() )
		.then( ( tabId: any ) => setTabs( prevState => {
			if ( !tabId.id ) return prevState
			const newState = [ ...prevState, tabId.id ]
			setActiveTab( newState[newState.length - 1].id )
			return newState
		} ) )
	}, [ activeTab, tabs ] )

	const deleteTab = useCallback( () => {
		fetch( `${ _apiBase }/delete-tab`, {
			method: 'DELETE',
			body: JSON.stringify( { "id": `${ activeTab }` } ),
			headers: { 'Content-type': 'application/json' }
		} )
		.then( ( res ) => res.json() )
		.then( ( res: any ) => setTabs( ( prevState ) => {
			console.log( 'deleteTab', res )
			if ( !res.affected ) {
				return prevState
			}
			const newState = prevState.filter( ( num ) => num.id !== activeTab )
			setActiveTab( () => {
				if ( !newState[0] ) return 0;
				return newState[0].id
			} )
			return newState
		} ) )
	}, [ activeTab, tabs ] )

	useEffect( () => {
		console.log( 'tabs', tabs )
	}, [ tabs, activeTab ] )

	return [
		tabs,
		activeTab,
		createTab,
		deleteTab,
		setActiveTab
	];
}