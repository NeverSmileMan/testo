import React, {FC, useCallback, useState, useContext} from "react";
import Tab from "./Tab";
import {makeStyles} from "@material-ui/styles";
import {MainContext} from '../main';

export const MAX_NUMBER_OF_TABS = 6;

const styles = makeStyles({
	header_tabs: {
		display: 'flex',
		width: '100%',
		paddingTop: '.4rem',
		boxSizing: 'border-box',
		height: '100%',
	},
	tab: {
		width: `calc((100% - 1.6rem) / ${MAX_NUMBER_OF_TABS})`,
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
})

function Tabs(props: any) {
	
	const {addTab, setActiveTab, activeTab} = useContext(MainContext)


	const {header_tabs, tab} = styles()
	const viewTabs = props.tabs.map((tab: any, index: any) => <Tab setActive={setActiveTab}
																														tab={tab}
																														index={index}
																														active={activeTab === index}
																														key={index}/>
	)
	return (
		<div className={header_tabs}>
			{viewTabs}
			{props.tabs.length < MAX_NUMBER_OF_TABS ?
				<div className={tab} onClick={addTab}>+</div>
				: null}
		</div>
	)
}
export default Tabs;