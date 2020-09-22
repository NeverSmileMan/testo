import React, { createContext, useCallback, useState } from 'react';
import Tabs from '../tabs/Tabs';
import Hint from '../tabs/hint/Hint';
import HomeButton from '../tabs/homeButton/HomeButton';
import GroupBtn from '../functional-buttons/groupBtn';
import AddedItemsTable from '../added.items.table/items.table/items.table';
import Search from '../searchPanel/pure_function_search/search/Search';
import OrderInfo from '../searchPanel/pure_function_search/orderInfo/OrderInfo';
import { ModalWindowProvider } from '../modal.context'
import { useTabs } from '../tabs/use.Tab.hook';
import { IItem } from '../searchPanel/search/itemsData';
import { useStyles } from './main.styles'
//---------plugs---------------
import { ScalePlug } from '../plugs/scale';
//-----------------------------

export const MainContext = createContext({
	confirmClose: () => { },
	addItem: (item: any) => true as boolean,
	print: () => { },
	submitValueCalc: (num: number) => { },
	setSelectedItem: (() => { }) as React.Dispatch<React.SetStateAction<IItem>>,
	selectedItem: {} as IItem,
});

export default function Main() {
	const { tab, sideButtons, info, bodyWrap, body, header, searchPanel } = useStyles();
	const [ selectedItem, setSelectedItem ] = useState( {} as IItem );
	const [ calcValue, setCalcValue ] = useState( 0 );

	const [
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
	] = useTabs( ScalePlug, calcValue );

	const submitValueCalc = useCallback(
		( val: number ) => {
			setCalcValue( val );
			setTara( val );
		},
		[calcValue, tabItems, activeTab],
	);

	const confirmClose = useCallback(() => {
		deleteTab();
	}, [deleteTab]);

	const context = {
		confirmClose,
		addItem,
		print,
		// changeHint,
		submitValueCalc,
		setSelectedItem,
		selectedItem,
		// deleteTab, //---------
	};

	return (
		<>
		<ModalWindowProvider>
			<div className={ header }>
				<div className={ tab }>
					<Tabs tabs={ tabItems } activeTab={ activeTab } createTab={ createTab } setActiveTab={ setActiveTab }/>
				</div>
				<div className={ info }>
					<Hint/>
					<HomeButton/>
				</div>
			</div>
			<div className={ bodyWrap }>
				<div className={ body }>
					<div className={ searchPanel }>
						<MainContext.Provider value={ context }>
							<Search/>{/* addItem, setType, setSelectedItem  */ }
						</MainContext.Provider>
						<OrderInfo value={ tabItems[activeTab].items } activeItem={ activeItem } onClick={ deleteItem }/>
					</div>
					<AddedItemsTable values={ tabItems[activeTab].items } onClick={ setActiveItem } active={ activeItem }/>
				</div>
				<MainContext.Provider value={ context }>
					<div className={ sideButtons }>
						<GroupBtn/>{/**  confirmClose print modalType setType, selectedItem, addItem  changeHint, submitValueCalc  */ }
					</div>
				</MainContext.Provider>
			</div>
			</ModalWindowProvider>
		</>
	);
}
