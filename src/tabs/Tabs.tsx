import React, { FC, useContext } from "react";
import Tab from "./Tab";
import { makeStyles } from "@material-ui/styles";
import { MainContext } from '../main';
import { TabItems } from './use.Tab.hook';
import { MAX_NUMBER_OF_TABS } from "../custom/variables";

const styles = makeStyles( {
	header_tabs: {
		display: 'flex',
		width: '100%',
		paddingTop: '.4rem',
		boxSizing: 'border-box',
		height: '100%',
	},
	tab: {
		width: `calc((100% - 1.6rem) / ${ MAX_NUMBER_OF_TABS })`,
		height: '100%',
		borderRadius: '.3rem .3rem 0 0',
		fontSize: '1.2em',
		fontWeight: 'bolder',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e4e4e4',
		color: '#333',
		border: 'none',
		boxSizing: 'border-box',
	}
} )


interface TabsProps {
	tabs: TabItems[]
	activeTab: number,
	createTab: ( e: React.MouseEvent<HTMLDivElement> ) => void,
	setActiveTab: ( val: number ) => void,
}

const Tabs: FC<TabsProps> = ( { tabs, createTab, activeTab, setActiveTab } ) => {
	const { header_tabs, tab } = styles()
	return (
		<div className={ header_tabs }>
			{ tabs.map( ( tab: TabItems, index: number ) => <Tab setActive={ setActiveTab }
			                                                     tab={ tab }
			                                                     index={ index }
			                                                     active={ activeTab === index }
			                                                     key={ index }/>
			) }
			{ tabs.length < MAX_NUMBER_OF_TABS ?
				<div className={ tab } onClick={ createTab }>+</div>
				: null }
		</div>
	)
}

export default Tabs;