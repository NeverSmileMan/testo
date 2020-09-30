import React, { FC } from "react";
import { Tab } from "../tab/Tab";
import { TabItems } from './useTabHook';
import { useStyles } from "./Tabs.styles";
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

interface TabsProps {
	tabs: TabItems[] | null
	activeTab: number,
	createTab: ( e: React.MouseEvent<HTMLButtonElement> ) => void,
	setActiveTab: ( val: number ) => void,
}

export const Tabs: FC<TabsProps> = (props) => {

	const { tabs, createTab, activeTab, setActiveTab } = props;
	const classes = useStyles();
	return (
		<div className={classes.headerTabs}>
			{tabs
				? tabs.map((tab: TabItems) => (
					<Tab
						setActive={setActiveTab}
						tab={tab}
						active={activeTab === tab.tabNumber}
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