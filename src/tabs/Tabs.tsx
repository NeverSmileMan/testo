import React, {FC, useCallback, useState} from "react";
import Tab, {ITab} from "./Tab";
import {makeStyles} from "@material-ui/styles";
import {Delete} from "@material-ui/icons";

export const MAX_NUMBER_OF_TABS = 6;

const Tabs: FC = () => {

	// const [tabsArray, setTabsArr] = useState(Array(MAX_NUMBER_OF_TABS).fill(true))
	// const [tabsArray, setTabsArr] = useState(Array(MAX_NUMBER_OF_TABS).fill(0).map((e: number, i) => i + 1))
	const [tabsArrayBool, setTabsArrBool] = useState(() => {
		const arr = Array(MAX_NUMBER_OF_TABS).fill(false)
		arr[0] = true
		return arr
	})
	const [tabs, setTabs] = useState([{tabNumber: 1} as ITab])
	const [activeTab, setActiveTab] = useState(0)
	// const [showCloseModal, setShowCloseModal] = useState(false)
	// const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	//     Tab.setSelectedItem()
	//     ScaleService.setTara()


	// const close = () => useCallback(() => deleteTab(activeTab), [])
	// const print = () => useCallback(() => {
	// 	// Order()
	// 	close();
	// }, [])

// =====================================================================================
	// const order: Map<number, ITab> = new Map()
// ========================================================================================

	const setActive = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const activeEl = +(e.target as Element).id
		setActiveTab(activeEl)
	}, [tabs, activeTab])


	const addTab = useCallback((e: React.MouseEvent<HTMLDivElement>) => {

		const num = tabsArrayBool.findIndex(item => !item) + 1
		const tabsCount = tabs.length
		setTabsArrBool((prevState) => {
			prevState[num - 1] = true;
			return prevState
		})
		setTabs((prevState) => [...prevState, {tabNumber: num}])
		setActiveTab((prevState) => tabsCount)

	}, [tabs, activeTab, tabsArrayBool])


	const deleteTab = useCallback(() => {

		const num = tabs[activeTab].tabNumber

		setTabsArrBool((prevState) => {
			prevState[num - 1] = false;
			return prevState
		})

		setTabs((prevState) => {
			// prevState.splice(activeTab, 1)
			return prevState.filter((value, index) => index !== activeTab)
		})
		console.log(1)
		setActiveTab((prevState) => 0)

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
		},
		none: {
			display: 'none'
		}
	})

	const {header_tabs, tab, none} = styles()

	return (
		<div className={header_tabs}>
			{tabs.map((tab, index) => <Tab setActive={setActive}
			                               tab={tab}
			                               index={index}
			                               active={activeTab === index}
			                               key={index }/>
			)}
			<div className={tabs.length === MAX_NUMBER_OF_TABS ? none : tab}
			     onClick={addTab}>+
			</div>
			<div onClick={deleteTab}><Delete/></div>
		</div>
	)
}
export default Tabs;