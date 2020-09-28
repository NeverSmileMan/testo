import React, { FC } from "react";
import { Tab } from "../tab/Tab";
import { TabItems } from './use.Tab.hook';
import { styles } from "./Tabs.styles";
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

interface TabsProps {
	tabs: TabItems[]
	activeTab: number,
	createTab: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
	setActiveTab: ( val: number ) => void,
}

export const Tabs: FC<TabsProps> = ( { tabs, createTab, activeTab, setActiveTab } ) => {
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
				<button className={ tab_style } onClick={ createTab }>+</button>
				: null }
		</div>
	)
}
