import React, { useState, createContext, useCallback } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from './tabs/Tabs';
import Hints from './tabs/Hints';
import HomeButton from './tabs/HomeButton';
import GroupBtn from './functional-buttons/groupBtn';
import AddedItemsTable from './added.items.table/added.items.table';
import Search from './searchPanel/search/Search';
import OrderInfo from './searchPanel/orderInfo/OrderInfo';
import ModalWindow from './functional-buttons/modal.wind/modal.wind';
import {MAX_NUMBER_OF_TABS} from './tabs/Tabs';
import {ITab} from './tabs/Tab';
//---------plugs---------------
import { values } from './plugs/added.items'
//-----------------------------

const useStyles = makeStyles((theme: Theme) => createStyles({
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
}));

export const MainContext = createContext({
  modalType: '' as string | null,
  setType: (val: string | null):any => {},
  deleteTab: ()=>{},
  addTab: (e: React.MouseEvent<HTMLDivElement>)=>{},
  confirmClose: ()=>{},
  tabs: [{tabNumber: 1} as ITab],
  activeTab:'' as any,
  setActive: (e: React.MouseEvent<HTMLDivElement>)=>{},
});


export default function Main() {

  const { tab, sideButtons, info, bodyWrap, body, header, searchPanel } = useStyles();
  const [modalType, setModalType] = useState(null as string | null);
  const setType = (type: string | null): any => () => setModalType(type)

  const [tabs, setTabs] = useState([{tabNumber: 1} as ITab])
	const [activeTab, setActiveTab] = useState(0)

  const [chooseFreeNumber, setChooseFreeNumber] = useState(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false)
		arr[0] = true
		return arr
	})
  const setActive = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const activeEl = +(e.target as Element).id
		setActiveTab(activeEl)
	}, [tabs, activeTab])
  const addTab = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const num = chooseFreeNumber.findIndex(item => !item) + 1
		setChooseFreeNumber((prevState) => {
			prevState[num - 1] = true;
			return prevState
		})
		setTabs((prevState) => [...prevState, {tabNumber: num}])
		setActiveTab(tabs.length)

	}, [tabs, chooseFreeNumber])


	const deleteTab = useCallback(() => {
    console.log('1>', 'we a here')
    if (tabs.length === 1) {
			if (tabs[0].tabNumber === 1) return
			else {
				setChooseFreeNumber((prevState) => {
					prevState[0] = true;
					return prevState
				})
				setTabs((prevState) => [...prevState, {tabNumber: 1}] )
			}
		}
		setChooseFreeNumber((prevState) => {
			prevState[tabs[activeTab].tabNumber - 1] = false;
			return prevState
		})
		setTabs((prevState) => prevState.filter((value, index) => index !== activeTab));
    setActiveTab((prevTabNum) => prevTabNum ? prevTabNum - 1 : 0);
	}, [tabs, activeTab])

  const confirmClose =()=> {
    setType(null)();
    deleteTab()
  };

  return (
    <MainContext.Provider value={{
      modalType,
      setType,
      deleteTab,
      addTab,
      confirmClose,
      activeTab,
      tabs,
      setActive}}>
      <div className={header}>
        <div className={tab}>
          <Tabs />
        </div>
        <div className={info}>
          <Hints error={false} />
          <HomeButton />
        </div>
      </div>
      <div className={bodyWrap}>
        <div className={body}>
          <div className={searchPanel}>
            <Search />
            <OrderInfo />
          </div>
          <AddedItemsTable values={values} onClick={'onClick' as any} active={null} />
        </div>
        <div className={sideButtons}>
          <GroupBtn />
        </div>
        {modalType && <ModalWindow />}
      </div>
    </MainContext.Provider>
  )
}