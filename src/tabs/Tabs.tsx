import React, {FC, useCallback, useState} from "react";
import Tab, {ITab} from "./Tab";
import {makeStyles} from "@material-ui/styles";
import {Delete} from "@material-ui/icons";

export const MAX_NUMBER_OF_TABS = 6;

const Tabs: FC = () => {

	const [chooseFreeNumber, setChooseFreeNumber] = useState(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false)
		arr[0] = true
		return arr
	})
	const [tabs, setTabs] = useState([{tabNumber: 1} as ITab])
	const [activeTab, setActiveTab] = useState(0)
	const [showCloseModal, setShowCloseModal] = useState(false)
	const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	const close = useCallback(() => deleteTab(), [])
	const print = useCallback(() => {	 /*Order() */
		close()
	}, [])

	const setActive = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const activeEl = +(e.target as Element).id
		setActiveTab(activeEl)
	}, [])

	const addTab = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const num = chooseFreeNumber.findIndex(item => !item) + 1
		setChooseFreeNumber((prevState) => {
			prevState[num - 1] = true;
			return prevState
		})
		setTabs((prevState) => [...prevState, {tabNumber: num}])
		setActiveTab(tabs.length)
	}, [tabs])

	const deleteTab = useCallback(() => {
		if (tabs.length === 1) {
			//умова при якій не видалятиметься ТАБ якщо він 1 і його номер також 1
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
		setTabs((prevState) => prevState.filter((value, index) => index !== activeTab))
		setActiveTab((prevTabNum) => prevTabNum ? prevTabNum - 1 : 0)
	}, [tabs, activeTab])

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
			<div onClick={deleteTab}><Delete/></div>
		</div>
	)
}
export default Tabs;