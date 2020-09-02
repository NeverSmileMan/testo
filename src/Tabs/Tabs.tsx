import React, {FC, useCallback, useEffect, useState} from "react";
import Tab, {ITab} from "./Tab";
import "./Tabs.css"

const Tabs: FC = () => {
	const tabsArr = [1, 2, 3, 4, 5, 6]
	const [activeTab, setActiveTab] = useState(1)
	const [tabNumber, setTabNumber] = useState([tabsArr[0]])
	const [numbers, setNumbers] = useState([{tabNumber: 1} as ITab])
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

	const addTab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

		// console.log(tabsArr.filter(n => tabNumber.indexOf(n) === -1))

		// console.log(tabsArr.filter(n => tabNumber.indexOf(n) === -1))

		setTabNumber((prevState) => [...prevState, prevState.slice(-1)[0] + 1])


		console.log(tabNumber)
		// console.log(tabsArr)

		// setNumbers((prevState) => [...prevState, {tabNumber: tabNumber[2]}])

	}, [numbers])


	// useEffect(() => {
	// 	console.log(123)
	// }, [numbers])


// стилі для активного табу та +
	const stylePlus = {
		backgroundColor: '#09f',
		color: '#fff'
	}


	return (
		<div className='header'>
			<div className="tabs">
				{/*{numbers.map((tab, index) => <Tab {...tab} key={index}/>)}*/}
				{tabNumber.map((num, index) => <Tab children={num} key={index}/>)}
				{/*{tabNumber.map((num, index) => <div className='tab' key={index}>{num}</div>)}*/}

				<button className="tab" style={stylePlus} disabled={tabNumber.length > 5}
				        onClick={addTab}>{tabNumber.length === 6 ? null : '+'}</button>
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
