import { IItem } from '../Item';
import itemsDataJSON from '../../../enum/items.json';
// import Config from '../data/config';

const online = true; // Config.server4444;
const hostName = 'http://localhost'; // Config.host;
const itemsData = itemsDataJSON as IItem[];

const allItems = `${ hostName }:4444/list`;
const itemsBySearchIndex = `${ hostName }:4444/list?searchIndex=`;
const itemById = `${ hostName }:4444/search?id=`;
const allTabs = `${ hostName }:4445/tab/list`;
const createTab = `${ hostName }:4445/tab/list`;

function request( url: string, options?: RequestInit, toJson = true ) {
	return (
		fetch( url, options )
		.then( ( response ) => {
			if ( response.ok ) {
				if ( toJson ) return response.json();
				return response.text();
			}
			throw new Error( 'BAD RESPONSE' );
		} )
		// eslint-disable-next-line no-console
		.catch( console.log )
	);
}

export function getAllItems(): Promise<IItem[]> {
	return request( allItems );
}

interface TabId {
	id: number
}

export function getAllTabs(): Promise<TabId[]> {
	return request( allTabs );
}

export function createTabId(): Promise<TabId> {
	return request( createTab );
}

export function getItemsBySearchIndex( searchIndex: string ): Promise<IItem[]> {
	if ( !online ) {
		const items = itemsData.filter(
			( item ) =>
				item.searchIndex.toUpperCase().includes( searchIndex ) ||
				String( item.plu ).includes( searchIndex ),
		);
		return Promise.resolve( items );
	}
	return request( `${ itemsBySearchIndex }${ searchIndex }` );
}

export function getItemById( id: string ): Promise<IItem> {
	return request( `${ itemById }${ id }` );
}

export const SearchService = {
	getItemsBySearchIndex, getAllTabs, createTabId
};