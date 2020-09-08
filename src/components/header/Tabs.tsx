import React, {FC, useCallback, useState} from "react";
import Tab, {ITab} from "./Tab";
import {makeStyles} from "@material-ui/styles";

export const MAX_NUMBER_OF_TABS = 6;

const Tabs: FC = () => {

	const [tabsArray, setTabsArr] = useState(Array(MAX_NUMBER_OF_TABS).fill(0).map((e: number, i) => i + 1))
	const [numbers, setNumbers] = useState([{tabNumber: tabsArray[0], active: true} as ITab])
	const [activeTab, setActiveTab] = useState(tabsArray[0])
	const [showCloseModal, setShowCloseModal] = useState(false)
	const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	//     Tab.setSelectedItem()
	//     ScaleService.setTara()


	// const close = () => useCallback(() => deleteTab(activeTab), [])
	// const print = () => useCallback(() => {
	// 	// Order()
	// 	close();
	// }, [])

	// =====================================================================================
	const order: Map<number, ITab> = new Map()
	const [ordersFreeNums, setOrdersFreeNums] = useState(Array(MAX_NUMBER_OF_TABS).fill(true))
// ========================================================================================

	//видаляєм активні таби
	const removeActiveTabs = (arr: Array<ITab>) => arr.forEach((value: ITab) => value.active = false)

	const setActive = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		removeActiveTabs(numbers)
		const activeEl = +(e.target as Element).id
		numbers[activeEl - 1].active = true
		setActiveTab(activeEl);
	}, [numbers, activeTab])

	// useEffect(() => {
	// 	console.log(`activeTab change = ${activeTab}`)
	// }, [numbers, activeTab])

	const addTab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
// =====================================================================================
		const orderNumber = ordersFreeNums.findIndex(item => item) + 1;
		console.log(ordersFreeNums[orderNumber], orderNumber)
		setOrdersFreeNums([...ordersFreeNums, ordersFreeNums[orderNumber] = false])
		console.log(ordersFreeNums)
		// ordersFreeNums[orderNumber - 1] = false
		// console.log(orderNumber)
// =====================================================================================


		removeActiveTabs(numbers)
		// filter
		const nextTab = numbers.slice(-1)[0].tabNumber + 1
		if (numbers.length === tabsArray.length) return
		setActiveTab(nextTab)
		setNumbers((prevState) => [...prevState, {tabNumber: nextTab, active: true}])

	}, [numbers, activeTab, ordersFreeNums])

	const deleteTab = useCallback(() => {
		if (numbers.length > 1) {
			setNumbers(numbers.filter(((value) => value.tabNumber !== activeTab)))
			setActiveTab(activeTab - 1)
		}
	}, [numbers])

	const styles = makeStyles({
		tabs: {
			display: 'flex',
			width: '60%',
			paddingTop: '.4rem',
			height: '100%',
		},
		tab: {
			marginRight: '.2rem',
			width: `calc((100% - 1.6rem) / ${MAX_NUMBER_OF_TABS})`,
			height: '100%',
			borderRadius: '.3rem .3rem 0 0',
			fontSize: '1.3em',
			fontWeight: 'bolder',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#e4e4e4',
			color: '#333',
			border: 'none',
			padding: '.5rem 0',
		},
		none: {
			display: 'none'
		}
	})

	const {tabs, tab, none} = styles()

	return (
		<div className={tabs}>
			{numbers.map((tab, index) => <Tab setActive={setActive}
			                                  tab={tab}
			                                  key={index + 1}/>
			)}
			<button className={numbers.length === MAX_NUMBER_OF_TABS ? none : tab}
			        disabled={numbers.length + 1 > MAX_NUMBER_OF_TABS}
			        onClick={addTab}>+
			</button>
		</div>
	)
}
export default Tabs;