import React, { FC } from "react";
import { TabItems } from "../tabs/useTabHook";
import { styles } from "../tabs/Tabs.styles";

interface TabProps {
	tab: TabItems;
	setActive: (val: number) => void;
	active: boolean
}

export const Tab: FC<TabProps> = ({ tab, setActive, active }) => {
	const classes = styles();
	return (
		<button
			type="button"
			id={tab.tabNumber.toString()}
			onClick={() => setActive(tab.tabNumber)}
			className={`${classes.tabStyle} ${active ? classes.tabActive : ''}`}
		>
			{tab.tabNumber}
		</button>
	);
};