import React, { FC } from "react";
import { TabItems } from "../tabs/useTabHook";
import { styles } from "../tabs/Tabs.styles";

interface TabProps {
	tab: TabItems;
	setActive: (val: number) => void;
	active: boolean
	index: number
}

export const Tab: FC<TabProps> = ({ tab, setActive, active, index }) => {
	const classes = styles();
	return (
		<button
			type="button"
			id={index.toString()}
			onClick={() => setActive(index)}
			className={`${classes.tabStyle} ${active ? classes.tabActive : ''}`}
		>
			{tab.tabNumber}
		</button>
	);
};