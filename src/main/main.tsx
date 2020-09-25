import React, { ReactElement, createContext, useCallback, useState } from 'react';
import Tabs from '../tabs/Tabs';
import Hint from '../tabs/hint/Hint';
import HomeButton from '../tabs/homeButton/HomeButton';
import GroupBtn from '../components/functional-buttons/group.btn';
import AddedItemsTable from '../components/added.items.table/items.table/items.table';
import Search from '../components/searchPanel/func_search/search/Search';
import OrderInfo from '../components/searchPanel/func_search/orderInfo/OrderInfo';
import { ModalWindowProvider } from '../components/modal.wind/modal.context'
import { useTabs, ArgAddItemFunc } from '../tabs/use.Tab.hook';
import { IItem } from '../components/searchPanel/data/itemsData';
import { useStyles } from './main.styles'
// ---------plugs---------------
import { ScalePlug } from '../plugs/scale';
//-----------------------------
interface Context {
  deleteTab: () => void;
  addItem: ({item, calcValue}: ArgAddItemFunc) => boolean;
  print: () => void;
  submitValueCalc: (num: number) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<IItem>>;
  selectedItem: IItem;
}

export const MainContext = createContext({
	deleteTab: () => { },
	addItem: () => true,
	print: () => { },
	submitValueCalc: () => { },
	setSelectedItem: () => { },
	selectedItem: {} as IItem,
} as Context);

export default function Main() : ReactElement {
	const { tab, sideButtons, info, bodyWrap, body, header, searchPanel } = useStyles();
	const [ selectedItem, setSelectedItem ] = useState( {} as IItem );

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
	] = useTabs( ScalePlug );

	const submitValueCalc = useCallback(
		( val: number ) => {
			setTara( val );
		},
		[setTara],
	);

	const context = {
		deleteTab,
		addItem,
		print,
		submitValueCalc,
		setSelectedItem,
		selectedItem,
	};

	return (
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
						<MainContext.Provider value={ context as Context }>
							<Search/>
						</MainContext.Provider>
						<OrderInfo value={ tabItems[activeTab].items } activeItem={ activeItem } onClick={ deleteItem }/>
					</div>
					<AddedItemsTable values={ tabItems[activeTab].items } onClick={ setActiveItem } active={ activeItem }/>
				</div>
				<MainContext.Provider value={ context }>
					<div className={ sideButtons }>
						<GroupBtn/>
					</div>
				</MainContext.Provider>
			</div>
			</ModalWindowProvider>
	);
}
