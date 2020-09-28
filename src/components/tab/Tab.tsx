import React, { FC } from "react";
import { TabItems } from "../tabs/use.Tab.hook";
import { styles } from "../tabs/Tabs.styles";

interface TabProps {
	tab: TabItems;
	setActive: (val: number) => void;
	active: boolean
	index: number
}

export const Tab: FC<TabProps> = ({tab, setActive, active, index}) => {
	const {tab_style, tab_active} = styles()
	return <button id={index.toString()}
	            onClick={() => setActive(index)}
	            className={`${tab_style} ${active ? tab_active : ''}`}>
		{tab.tabNumber}
	</button>
}