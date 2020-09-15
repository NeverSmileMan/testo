import React, {useState, createContext, useCallback} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Tabs from './tabs/Tabs';
import Hints from './tabs/Hints';
import HomeButton from './tabs/HomeButton';
import GroupBtn from './functional-buttons/groupBtn';
import AddedItemsTable from './added.items.table/added.items.table';
import Search from './searchPanel/search/Search';
import OrderInfo from './searchPanel/orderInfo/OrderInfo';
import ModalWindow from './functional-buttons/modal.wind/modal.wind';
import {MAX_NUMBER_OF_TABS} from './tabs/Tabs';
import {ActiveInputService} from './services/ActiveInputService';
//---------plugs---------------
import {ScalePlug} from './plugs/scale';
import items from "./searchPanel/search/itemsData";
//-----------------------------

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		header: {
			width: '100%',
			height: '14%',
			display: 'flex',
		},
		tab: {
			width: '100%',
			height: '100%',
		},
		info: {
			width: '100%',
			height: '100%',
			display: 'flex',
			justifyContent: 'space-around',
		},
		bodyWrap: {
			width: '100%',
			height: '86%',
			display: 'flex',
		},
		searchPanel: {
			width: '100%',
			height: '17%',
			display: 'flex',
		},
		body: {
			width: '92%',
			height: '100%',
			borderRadius: '0 0 0 .4em',
			borderBottom: `2px ${theme.palette.primary.main} solid`,
			borderLeft: `2px ${theme.palette.primary.main} solid`,
			boxSizing: 'border-box',
			overflow: 'hidden',
			position: 'relative',
		},
		sideButtons: {
			width: '8%',
			height: '100%',
			display: 'flex',
		},
	}),
);

export const MainContext = createContext({
	modalType: '' as string | null,
	setType: (val: string | null): any => {
	},
	deleteTab: () => {
	},
	addTab: (e: React.MouseEvent<HTMLDivElement>) => {
	},
	confirmClose: () => {
	},
	setActiveTab: (val: any) => {
	},
	addItem: (item: any) => true as boolean,
	activeTab: '' as any,
	print: () => {
	}
});

export default function Main() {
	const {tab, sideButtons, info, bodyWrap, body, header, searchPanel} = useStyles();
	const [modalType, setModalType] = useState(null as string | null);
	const setType = (type: string | null): any => () => setModalType(type);

	const [error, setError] = useState('');

	const [
		tabItems,
		activeTab,
		activeItem,
		setActiveTab,
		setActiveItem,
		addItem,
		deleteItem,
		addTab,
		deleteTab,
		setTara,
		print
	] = useTabs(setError, setModalType, ScalePlug);

	const confirmClose = () => {
		setType(null)();
		deleteTab();
	};

	return (
		<MainContext.Provider
			value={{
				modalType,
				setType,
				activeTab,
				deleteTab,
				addTab,
				confirmClose,
				addItem,
				setActiveTab,
				print
			}}
		>
			<div className={header}>
				<div className={tab}>
					<Tabs tabs={tabItems}/>
				</div>
				<div className={info}>
					<Hints error={false}/> {/** херня */}
					<HomeButton/>
				</div>
			</div>
			<div className={bodyWrap}>
				<div className={body}>
					<div className={searchPanel}>
						<Search/>
						<OrderInfo value={tabItems[activeTab].items} activeItem={activeItem} onClick={deleteItem}/>
					</div>
					<AddedItemsTable values={tabItems[activeTab].items} onClick={setActiveItem} active={activeItem}/>
				</div>
				<div className={sideButtons}>
					<GroupBtn/>
				</div>
				{modalType && <ModalWindow/>}
			</div>
		</MainContext.Provider>
	);
}

export interface TabItems {
	tabNumber: number;
	tara: number;
	items: AddedItem[];
}

interface Item {
	code: string;
	name: string;
	price: number;
	type: 'ваговий' | 'штучний'; //поменять?
}

interface AddedItem extends Item {
	amount: number;
	cost: number;
}

function useTabs(
	setError: any,
	setModal: any,
	scaleService: any,
): [
	TabItems[],
	number,
		AddedItem | null,
	React.Dispatch<React.SetStateAction<number>>,
	React.Dispatch<React.SetStateAction<AddedItem | null>>,
	(item: Item) => boolean,
	() => void,
	() => void,
	() => void,
	(tara: number) => void,
	() => void,
] {
	const [tabItems, setTabItems] = useState<TabItems[]>([{tabNumber: 1, tara: -1, items: [],},] as TabItems[]);
	const [activeTab, setActiveTab] = useState<number>(0);
	const [activeItem, setActiveItem] = useState<AddedItem | null>(null);
	const [freeTabNumbers, setFreeTabNumbers] = useState(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false);
		arr[0] = true;
		return arr;
	});

	const setTara = useCallback((tara: number) => {
		tabItems[activeTab].tara = tara
		setTabItems([...tabItems])
	}, [tabItems]);


	const addItem = useCallback((item: Item) => {
			if (scaleService.checkStable()) {
				const addedItem = {...item} as AddedItem;

				if (item.type === 'штучний') {
					addedItem.amount = setModal('print'); //---------------------------- тут как?
					return true;
				}

				if (item.type === 'ваговий' && scaleService.getItemWeight() > 40) {
					scaleService.setTitle(item.name);
					scaleService.setPrice(item.price);

					addedItem.amount = scaleService.getItemWeight();
					addedItem.cost = scaleService.getItemCost();

					// setModal('print'); //---------------------------- тут как?

					tabItems[activeTab].items.push(addedItem);
					setTabItems([...tabItems]);
					ActiveInputService.clear();
					return true;
				} else {
					setError('Вага повинна перевищувати 40 грам');
					return false;
				}
			}
			return false;
		}, [tabItems, activeTab],
	);

	const deleteItem = useCallback(() => {
		tabItems[activeTab].items = tabItems[activeTab].items.filter((item) => item !== activeItem);
		setTabItems([...tabItems]);
		setActiveItem(null);
	}, [tabItems, activeItem]);

	const createOrder = useCallback(() => {
	}, []);
	const closeOrder = useCallback(() => {
	}, []);

	const getTara = useCallback(() => {
		return tabItems[activeTab].tara
	}, []);

	const print = useCallback(() => {
		console.log('print', tabItems[activeTab].items)
	}, [tabItems]);

	const addTab = useCallback(() => {
		const num = freeTabNumbers.findIndex(item => !item) + 1
		setFreeTabNumbers((prevState) => {
			prevState[num - 1] = true;
			return prevState
		})
		setTabItems((prevState) => [...prevState, {
			tabNumber: num,
			tara: -1,
			items: [],
		}])
		setActiveTab(tabItems.length)
	}, [tabItems, freeTabNumbers])

	const deleteTab = useCallback(() => {
		console.log('1>', 'we a here')
		if (tabItems.length === 1) {
			if (tabItems[0].tabNumber === 1) return
			else {
				setFreeTabNumbers((prevState) => {
					prevState[0] = true;
					return prevState
				})
				setTabItems((prevState) => [...prevState, {
					tabNumber: 1,
					tara: -1,
					items: [],
				}])
			}
		}
		setFreeTabNumbers((prevState) => {
			prevState[tabItems[activeTab].tabNumber - 1] = false;
			return prevState
		})
		setTabItems((prevState) => prevState.filter((value, index) => index !== activeTab));
		setActiveTab((prevTabNum) => prevTabNum ? prevTabNum - 1 : 0);
	}, [tabItems, activeTab])

	return [tabItems, activeTab, activeItem, setActiveTab, setActiveItem, addItem, deleteItem, addTab, deleteTab, setTara, print];
}





