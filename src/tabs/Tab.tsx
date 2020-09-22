import React, { FC } from "react";
import { TabItems } from "./use.Tab.hook";
import { styles } from "./Tabs.styles";

interface TabProps {
	tab: TabItems;
	setActive: (val: number) => void;
	active: boolean
	index: number
}

const Tab: FC<TabProps> = ({tab, setActive, active, index}) => {
	const {tab_style, tab_active} = styles()
	return <div id={index.toString()}
	            onClick={() => setActive(index)}
	            className={`${tab_style} ${active ? tab_active : ''}`}>
		{tab.tabNumber}
	</div>
}
export default Tab;