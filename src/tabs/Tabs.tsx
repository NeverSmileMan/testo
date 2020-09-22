import React, { FC, useEffect } from "react";
import Tab from "./Tab";
import { TabItems } from './use.Tab.hook';
import { MAX_NUMBER_OF_TABS } from "../custom/variables";
import { styles } from "./Tabs.styles";

interface TabsProps {
	tabs: TabItems[]
	activeTab: number,
	createTab: ( e: React.MouseEvent<HTMLDivElement> ) => void,
	setActiveTab: ( val: number ) => void,
}

const Tabs: FC<TabsProps> = ( { tabs, createTab, activeTab, setActiveTab } ) => {
	const { header_tabs, tab_style } = styles()

	return (
		<div className={ header_tabs }>
			{ tabs.map( ( tab: TabItems, index: number ) => <Tab setActive={ setActiveTab }
			                                                     tab={ tab }
			                                                     index={ index }
			                                                     active={ activeTab === index }
			                                                     key={ index }/>
			) }
			{ tabs.length < MAX_NUMBER_OF_TABS ?
				<div className={ tab_style } onClick={ createTab }>+</div>
				: null }
		</div>
	)
}

export default Tabs;