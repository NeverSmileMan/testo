import React, {FC, useCallback, useEffect, useState} from "react";
import Tab, {ITab} from "./Tab";
import "./Tabs.css"


const Tabs: FC = () => {
	const NUMBER_OF_TABS = 6;
	const [numbers, setNumbers] = useState([{tabNumber: 1, active: true} as ITab])
	const [activeTab, setActiveTab] = useState(1)
	const [showCloseModal, setShowCloseModal] = useState(false)
	const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	//     Tab.setSelectedItem()
	//     ScaleService.setTara()

	const deleteTab = useCallback((number: number) => {
	}, [])

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
		numbers.forEach((value, index) => {
			value.active = false;
		})
		const nextTab = numbers.slice(-1)[0].tabNumber + 1;
		setActiveTab(nextTab)
		setNumbers((prevState) => [...prevState, {tabNumber: nextTab, active: true}])
	}, [numbers])

	return (
		<div className='header'>
			<div className="tabs">
				{numbers.map((tab, index) => <Tab setActive={setActive}
				                                  tab={tab}
				                                  key={index + 1}/>
				)}
				<button className={numbers.length === NUMBER_OF_TABS ? 'none' : 'tab'}
				        disabled={numbers.length + 1 > NUMBER_OF_TABS}
				        onClick={addTab}>+
				</button>
			</div>

			<div className="hints">
				<input className="hints_input"
				       type="text"
				       readOnly={true}
				       value="Вага товару має перевищувати 40 грам"/>
			</div>
			<div className="home">
				<button>home</button>
			</div>


		</div>
	)
}
export default Tabs;
