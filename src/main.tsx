import React, { createContext, useCallback, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from './tabs/Tabs';
import Hint from './tabs/Hint';
import HomeButton from './tabs/HomeButton';
import GroupBtn from './functional-buttons/groupBtn';
import AddedItemsTable from './added.items.table/added.items.table';
import Search from './searchPanel/search/Search';
import OrderInfo from './searchPanel/orderInfo/OrderInfo';
import ModalWindow from './functional-buttons/modal.wind/modal.wind';
import { useTabs } from './tabs/use.Tab.hook';
import { IItem } from './searchPanel/search/itemsData'
import { Hints } from './custom/variables';
import { useHints } from './custom/hooks';
//---------plugs---------------
import { ScalePlug } from './plugs/scale';
// import items from "./searchPanel/search/itemsData";
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
  setType: (val: string | null): any => { },
  deleteTab: () => { },
  addTab: (e: React.MouseEvent<HTMLDivElement>) => { },
  confirmClose: () => { },
  setActiveTab: (val: any) => { },
  addItem: (item: any) => true as boolean,
  activeTab: '' as any,
  showPrint: () => { },
  changeHint: (str: Hints, likeError?: boolean) => {},
  submitValueCalc: (num: number) => { },
  setSelectedItem: (() => { }) as React.Dispatch<React.SetStateAction<IItem>>,
  setCalcValue: (() => { }) as React.Dispatch<React.SetStateAction<number>>,
  calcValue: 0 as number,
  activeTara: 0 as number,
  selectedItem: {} as IItem,
});

export default function Main() {
  const { tab, sideButtons, info, bodyWrap, body, header, searchPanel } = useStyles();
  const [modalType, setModalType] = useState(null as string | null);
  const [selectedItem, setSelectedItem] = useState({} as IItem)
  const setType = (type: string | null): any => () => setModalType(type);
  const [calcValue, setCalcValue] = useState(0);
  const submitValueCalc = (val: number) => {
    setCalcValue(val);
    setType(null)();
  };


  const [hint, error, changeHint] = useHints();




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
  ] = useTabs(changeHint, ScalePlug, calcValue);

  const confirmClose = useCallback(() => {
    setType(null)();
    deleteTab();
  }, [setType, deleteTab]);



  const showPrint = () => {
    setType(null)();
    print()
  }

  const showTara = () => {
    setTara()
    changeHint(Hints.PositiveWeight)
  }

  useEffect(() => {
    showTara()
  }, [calcValue])
  const activeTara=tabItems[activeTab].tara;

  return (
    <MainContext.Provider
      value={{
        modalType,
        setType,
        deleteTab,
        addTab,
        confirmClose,
        setActiveTab,
        addItem,
        activeTab,
        showPrint,
        changeHint,
        submitValueCalc,
        setSelectedItem,
        setCalcValue,
        calcValue,
        activeTara:tabItems[activeTab].tara,
        selectedItem
      }}
    >
      <div className={header}>
        <div className={tab}>
          <Tabs tabs={tabItems} />
        </div>
        <div className={info}>
          <Hint hint={hint} error={error} />
          <HomeButton />
        </div>
      </div>
      <div className={bodyWrap}>
        <div className={body}>
          <div className={searchPanel}>
            <Search />
            <OrderInfo value={tabItems[activeTab].items} activeItem={activeItem} onClick={deleteItem} />
          </div>
          <AddedItemsTable values={tabItems[activeTab].items} onClick={setActiveItem} active={activeItem} />
        </div>
        <div className={sideButtons}>
          <GroupBtn />
        </div>
        {modalType && <ModalWindow />}
      </div>
    </MainContext.Provider>
  );
}
