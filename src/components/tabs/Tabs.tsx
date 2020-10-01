import React, { FC } from 'react';
import { Tab } from '../tab/Tab';
import { TabItems } from './useTabs.hook';
import { MAX_NUMBER_OF_TABS } from '../../enum/variables';
import { useStyles } from './Tabs.styles';

interface TabsProps {
	tabs: TabItems[];
	activeTab: number;
	createTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
	setActiveTab: (val: number) => void;
}

export const Tabs: FC<TabsProps> = (props) => {
	const { tabs, createTab, activeTab, setActiveTab } = props;
	const classes = useStyles({ MAX_NUMBER_OF_TABS });
	return (
		<div className={classes.headerTabs}>
			{tabs
				? tabs.map((tab: TabItems, index: number) => (
					<Tab
						setActive={setActiveTab}
						tab={tab}
						index={index}
						active={activeTab === index}
						key={tab.tabId}
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
