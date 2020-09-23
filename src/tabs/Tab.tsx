import React, { FC } from "react";
import { styles } from "./Tabs.styles";

interface TabProps {
	tabId: number;
	setActive: (val: number) => void;
	active: boolean
}

const Tab: FC<TabProps> = ({tabId, setActive, active}) => {
	const {tab_style, tab_active} = styles()
	return <div id={tabId.toString()}
	            onClick={() => setActive(tabId)}
	            className={`${tab_style} ${active ? tab_active : ''}`}>
		{tabId}
	</div>
}
export default Tab;