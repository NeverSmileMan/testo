import React, {FC, useCallback, useEffect, useState} from "react";
import Tab, {ITab} from "./Tab";
import "./Tabs.css"
import {makeStyles} from "@material-ui/styles";


const Tabs: FC = () => {
	const NUMBER_OF_TABS = 6;
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
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'row',
			alignItems: 'flex-end',
			height: '9%',
			outline: 'none'
		},
		tabs: {
			display: 'flex',
			width: '60%',
			paddingTop: '.4rem'
		},
		tab: {
			marginRight: '.2rem',
			width: 'calc((100% - 1.6rem) / 8)',
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
		hints_input: {
			backgroundColor: '#fff',
			width: '100%',
			height: '100%',
			borderRadius: '.4rem',
			padding: '.8em',
			textAlign: 'center',
			fontSize: '.6em',
			border: '1px solid #797979',
		},
		none: {
			display: 'none'
		}
	})

	const {header, tabs, tab, none, hints_input} = styles()

	return (
		<div className={header}>
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

			<div className={hints_input}>
				<input className={hints_input}
				       type="text"
				       readOnly={true}
				       value="Вага товару має перевищувати 40 грам"/>
			</div>
			<div className="home">
				<button>home</button>
				<button onClick={deleteTab}>deleteTAb</button>
			</div>
		</div>
	)
}
export default Tabs;
