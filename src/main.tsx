import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';


import Tabs from './tabs/Tabs';
import Hints from './tabs/Hints';
import HomeButton from './tabs/HomeButton';
import GroupBtn from './functional-buttons/groupBtn';
import AddedItemsTable from './added.items.table/added.items.table';
import Search from './searchPanel/search/Search';
import OrderInfo from './searchPanel/orderInfo/OrderInfo';

//---------plugs---------------
import {values} from './plugs/added.items'

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
        position: 'relative',
	},
	body: {
    width: '92%',
    height: '100%',
    borderRadius: '0 0 0 .4em',
    borderBottom: `2px ${theme.palette.primary.main} solid`,
    borderLeft: `2px ${theme.palette.primary.main} solid`,
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
	sideButtons: {
		width: '8%',
		height: '100%',
		display: 'flex',
	},
}));


export default function Main() {

	const {tab, sideButtons, info, bodyWrap, body, header, searchPanel} = useStyles();

	return (
		<>
			<div className={header}>
				<div className={tab}>
					<Tabs/>
				</div>
				<div className={info}>
					<Hints error={false}/>
					<HomeButton/>
				</div>
			</div>
			<div className={bodyWrap}>
				<div className={body}>
					<div className={searchPanel}>
                        <Search />
                        <OrderInfo />
                    </div>
					<AddedItemsTable values={values} onClick={'onClick' as any} active={null}/>
				</div>
				<div className={sideButtons}>
					<GroupBtn/>
				</div>
			</div>
		</>
	)
}
