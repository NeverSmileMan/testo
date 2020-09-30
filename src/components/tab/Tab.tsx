import React, { FC } from "react";
import { TabItems } from "../tabs/useTabs.hook";
import { useStyles } from "./Tab.style";
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

interface TabProps {
	tab: TabItems;
	setActive: ( val: number ) => void;
	active: boolean
	index: number
}

export const Tab: FC<TabProps> = ( props ) => {
	const { tab, setActive, active, index } = props;
	const classes = useStyles( { active, MAX_NUMBER_OF_TABS } );
	return (
		<button
			type="button"
			id={ index.toString() }
			onClick={ () => setActive( index ) }
			className={ classes.tabStyle }
		>
			{ tab.tabNumber }
		</button>
	);
};