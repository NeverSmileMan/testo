import React, {FC, useCallback, useState} from "react";
import Tab, {ITab} from "../Tab/Tab";
import "./Tabs.css"

const Tabs: FC = () => {

	const [activeTab, setActiveTab] = useState(1)
	const [numbers, setNumber] = useState([{tabNumber: activeTab} as ITab])
	const [showCloseModal, setShowCloseModal] = useState(false)
	const [isPrintDisabled, setIsPrintDisabled] = useState(false)

	//     Tab.setSelectedItem()
	//     ScaleService.setTara()

	const setActive = (number: number) => {
		// Input.clear()
	}
	const deleteTab = (number: number) => {
	}
	const close = () => deleteTab(activeTab)

	const print = () => {
		// Order()
		close();
	}

	const addTab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setActiveTab(2)
		setNumber(prevState => [...prevState, {tabNumber: activeTab}])
	}, [])

	return (
		<div className="tabs">
			{numbers.map((tab, index) => {
				if (numbers.length >= 6) {
					return setNumber([{tabNumber: activeTab} as ITab])
				} else {
					return <Tab {...tab} key={index}/>
				}
			})}

			<button className="tab" onClick={addTab}>+</button>
		</div>
	)
}
export default Tabs;