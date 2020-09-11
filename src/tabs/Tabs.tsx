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

const Tabs: FC = () => {
	const {addTab, setActive, tabs, activeTab} = useContext(MainContext)
	const [chooseFreeNumber, setChooseFreeNumber] = useState(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false)
		arr[0] = true
		return arr
	})
	// const [showCloseModal, setShowCloseModal] = useState(false)
	// const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	// const close = useCallback(() => deleteTab(), [])
	// const print = useCallback(() => {	 /*Order() */
	// 	close()
	// }, [])
	const {header_tabs, tab} = styles()
	const viewTabs = tabs.map((tab, index) => <Tab setActive={setActive}
	                                               tab={tab}
	                                               index={index}
	                                               active={activeTab === index}
	                                               key={index}/>
	)
	return (
		<div className={header_tabs}>
			{viewTabs}
			{tabs.length < MAX_NUMBER_OF_TABS ?
				<div className={tab} onClick={addTab}>+</div>
				: null}
			{/* <div onClick={deleteTab}><Delete/></div> */}
		</div>
	)
}
export default Tabs;