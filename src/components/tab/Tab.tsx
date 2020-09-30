import React, { FC } from "react";
import { TabItems } from "../tabs/useTabHook";
import { useStyles } from "./Tab.styles";

interface TabProps {
	tab: TabItems;
	setActive: (val: number) => void;
	active: boolean
}

export const Tab: FC<TabProps> = ({ tab, setActive, active }) => {
	const classes = useStyles();
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