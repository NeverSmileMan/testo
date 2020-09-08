import React from 'react'
import { useTheme, makeStyles  } from '@material-ui/core/styles';


import Tabs from './tabs/Tabs';
import Hints from './tabs/Hints';
import HomeButton from './tabs/HomeButton';
import GroupBtn from './functional-buttons/groupBtn';
import AddedItemsTable from './added.items.table/added.items.table';
import Search from './search/Search';
//---------plugs---------------

import {values} from './plugs/added.items'

//-----------------------------



const useStyles = makeStyles({
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
	body: {
    width: '92%',
    height: '100%',
  },
	sideButtons: {
    width: '8%',
    height: '100%',
    display: 'flex',
  },
});



export default function Main() {

	const classes = useStyles();

  return (
    <>
    <div className={classes.header}>
      <div className={classes.tab}>
        <Tabs/>
      </div>
      <div className={classes.info}>
        <Hints/>
        <HomeButton/>
      </div>
    </div>
    <div className={classes.bodyWrap}>
      <div className={classes.body}>
        <Search />
        <AddedItemsTable values={values} onClick={'onClick' as any} active={null}/>
      </div>  
      <div className={classes.sideButtons}>
        <GroupBtn />
      </div>
    </div>
    </>
  )
}
