import React, {FC, useCallback, useEffect, useState} from "react";
import Tab, {ITab} from "./Tab";
import {makeStyles} from "@material-ui/styles";

export const NUMBER_OF_TABS = 6;

const Tabs: FC = () => {

	const [numbers, setNumbers] = useState([{tabNumber: 1, active: true} as ITab])
	const [activeTab, setActiveTab] = useState(1)
	const [showCloseModal, setShowCloseModal] = useState(false)
	const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	//     Tab.setSelectedItem()
	//     ScaleService.setTara()


	// const close = () => useCallback(() => deleteTab(activeTab), [])
	// const print = () => useCallback(() => {
	// 	// Order()
	// 	close();
	// }, [])

	const setActive = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		numbers.forEach((value) => value.active = false)
		const activeEl = +(e.target as Element).id
		numbers[activeEl - 1].active = true
		setActiveTab(activeEl);

	}, [numbers])


	useEffect(() => {
		console.log(`activeTab change = ${activeTab}`)
	}, [activeTab])


	const addTab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		numbers.forEach((value) => {
			value.active = false;
		})
		const nextTab = numbers.slice(-1)[0].tabNumber + 1;
		setActiveTab(nextTab)
		setNumbers((prevState) => [...prevState, {tabNumber: nextTab, active: true}])
	}, [numbers])

	const deleteTab = useCallback(() => {
		console.log(numbers)

		numbers.filter(((value) => value.tabNumber !== activeTab))

		console.log(numbers)
	}, [numbers, activeTab])

	const styles = makeStyles({
		tabs: {
			display: 'flex',
			width: '60%',
			paddingTop: '.4rem',
			height: '100%',
		},
		tab: {
			marginRight: '.2rem',
			width: `calc((100% - 1.6rem) / ${NUMBER_OF_TABS})`,
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
			<button className={numbers.length === NUMBER_OF_TABS ? none : tab}
			        disabled={numbers.length + 1 > NUMBER_OF_TABS}
			        onClick={addTab}>+
			</button>
		</div>
	)
}
export default Tabs;