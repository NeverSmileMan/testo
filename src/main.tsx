import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from './tabs/Tabs';
import Hint from './tabs/hint/Hint';
import HomeButton from './tabs/homeButton/HomeButton';
import { useTabs } from './tabs/useTabs';
import { useHints } from './custom/hooks';

const useStyles = makeStyles( ( theme: Theme ) =>
	createStyles( {
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
			borderBottom: `2px ${ theme.palette.primary.main } solid`,
			borderLeft: `2px ${ theme.palette.primary.main } solid`,
			boxSizing: 'border-box',
			overflow: 'hidden',
			position: 'relative',
		},
		sideButtons: {
			width: '8%',
			height: '100%',
			display: 'flex',
		},
	} ),
);

export default function Main() {
	const { tab, sideButtons, info, bodyWrap, body, header, searchPanel } = useStyles();
	const [ hint, error, changeHint ] = useHints();

	const [ tabs, activeTab, createTab, deleteTab, setActiveTab ] = useTabs();

	return (
		<>
			<div className={ header }>
				<div className={ tab }>
					<Tabs tabs={ tabs } activeTab={ activeTab } createTab={ createTab } setActiveTab={ setActiveTab }/>
				</div>
				<div className={ info }>
					<Hint hint={ hint } error={ error }/>
					<HomeButton/>
					<button onClick={ deleteTab }>delete</button>
				</div>
			</div>
		</>
	);
}