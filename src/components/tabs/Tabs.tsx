import React, { FC } from "react";
import { Tab } from "../tab/Tab";
import { TabItems } from './useTabHook';
import { styles } from "./Tabs.styles";
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

interface TabsProps {
	tabs: TabItems[] | null
	activeTab: number,
	createTab: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
	setActiveTab: ( val: number ) => void,
}

export const Tabs: FC<TabsProps> = ({ tabs, createTab, activeTab, setActiveTab }) => {
	const classes = styles();
	return (
		<div className={classes.headerTabs}>
			{tabs
				? tabs.map((tab: TabItems, index: number) => (
					<Tab
						setActive={setActiveTab}
						tab={tab}
						index={index}
						active={activeTab === index}
						key={tab.tabNumber}
					/>
				))
				: null}
			{tabs && tabs.length < MAX_NUMBER_OF_TABS ? (
				<button type="button" className={classes.tabStyle} onClick={createTab}>
					+
				</button>
			) : null}
		</div>
	);
};