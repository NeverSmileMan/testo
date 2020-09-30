import React, { ReactElement, createContext, useCallback, useState } from 'react';
import { Tabs } from '../../../components/tabs/Tabs';
import { Hint } from '../../../components/hint/Hint';
import { HomeButton } from '../../../components/homeButton/HomeButton';
import GroupBtn from '../../../components/functional-buttons/group.btn';
import { AddedItemsTable } from '../../../components/items.table/items.table';
import { Search } from '../../../components/search/Search';
import { TabInfoStyled } from '../../../components/tabInfo/TabInfo';
import { ModalWindowProvider } from '../../../components/modal.wind/modal.context'
import { useTabs, ArgAddItemFunc } from '../../../components/tabs/useTabHook';
import { IItem } from '../../../components/search.list/Item';
import { useStyles } from './main.styles'
// ---------plugs---------------
import { ScalePlug } from '../../../enum/scale';

//-----------------------------
interface Context {
	deleteTab: () => void;
	addItem: ( { item, calcValue }: ArgAddItemFunc ) => boolean;
	print: () => void;
	submitValueCalc: ( num: number ) => void;
	setSelectedItem: React.Dispatch<React.SetStateAction<IItem>>;
	selectedItem: IItem;
	activeTab: number;
}

export const MainContext = createContext<Context>( {
	deleteTab: () => { },
	addItem: () => true,
	print: () => { },
	submitValueCalc: () => { },
	setSelectedItem: () => { },
	selectedItem: {} as IItem,    // ! убрать как??????
	activeTab: 0,
});

export default function Main(): ReactElement {
	const classes = useStyles();
	const [ selectedItem, setSelectedItem ] = useState<IItem>();

	const {
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
	} = useTabs( ScalePlug );

	const submitValueCalc = useCallback(
		( val: number ) => {
			setTara( val );
		},
		[ setTara ],
	);

	const context : Context = {
		deleteTab,
		addItem,
		print,
		submitValueCalc,
		setSelectedItem,
		selectedItem,
		activeTab
	} as Context;  // ! убрать ( пофиксить делит таб и модалку клоз)

	return (
		<ModalWindowProvider>
			<div className={ classes.header }>
				<div className={ classes.tab }>
					<Tabs tabs={ tabItems } activeTab={ activeTab } createTab={ createTab } setActiveTab={ setActiveTab }/>
				</div>
				<div className={ classes.info }>
					<Hint/>
					<HomeButton/>
				</div>
			</div>
			<div className={ classes.bodyWrap }>
				<div className={ classes.body }>
					<div className={ classes.searchPanel }>
						<MainContext.Provider value={ context  }>
							<Search />
						</MainContext.Provider>
						<TabInfoStyled value={tabItems[activeTab]?.items} activeItem={ activeItem } onClick={ deleteItem } />
					</div>
					<AddedItemsTable values={ tabItems[activeTab]?.items} onClick={ setActiveItem } active={ activeItem }/>
				</div>
				<MainContext.Provider value={ context}>
					<div className={ classes.sideButtons }>
						<GroupBtn/>
					</div>
				</MainContext.Provider>
			</div>
		</ModalWindowProvider>
	);
}
