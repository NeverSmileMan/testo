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

	function requestTab( url: string, method: string, body?: any ) {
		return fetch( `http://10.13.16.80:4445/${ url }`, {
			method: method,
			body: body,
			headers: { 'Content-type': 'application/json' }
		} )
		.then( ( res ) => res.json() )
	}

	const [ tabs, setTabs ] = useState<Array<TabId>>( [] )
	const [ activeTab, setActiveTab ] = useState<number>( () => {
		if ( !tabs.length ) return 0;
		return tabs[0].id
	} )

	useEffect( () => {
		requestTab('tab/list','GET')
		.then( ( value ) => {
			setTabs( value )
			setActiveTab( () => {
				if ( !value.length ) return 0;
				return value[value.length - 1].id
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
		const body = JSON.stringify( { "id": `${ activeTab }`})
		requestTab('delete-tab', 'DELETE', body)
		.then( ( res: any ) => setTabs( ( prevState ) => {
			console.log( 'deleteTab', res )
			if ( !res.affected ) {
				return prevState
			}
			const newState = prevState.filter( ( num ) => num.id !== activeTab )
			setActiveTab( () => {
				if ( !newState.length ) return 0;
				return newState[0].id
			} )
			return newState
		} ) )
	}, [ activeTab, tabs ] )

	return [
		tabs,
		activeTab,
		createTab,
		deleteTab,
		setActiveTab
	];
}