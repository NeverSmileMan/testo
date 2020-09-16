import React, {FC} from "react";
import {makeStyles} from "@material-ui/styles";
import {MAX_NUMBER_OF_TABS} from "./Tabs";
import {createStyles, Theme} from "@material-ui/core/";
import {TabItems} from "./use.Tab.hook";

interface PropsTab {
	tab: TabItems;
	setActive: (val: number) => void;
	active: boolean
	index: number
}

const styles = makeStyles((theme: Theme) => createStyles({
	tab_style: {
		marginRight: '.2rem',
		width: `calc((100% - 1.6rem) / ${MAX_NUMBER_OF_TABS})`,
		height: '100%',
		borderRadius: '.3rem .3rem 0 0',
		fontSize: '1.2em',
		fontWeight: 'bolder',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#e4e4e4',
		color: '#333',
		border: 'none',
	},
	tab_active: {
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		outline: 'none',
	}
}))

const Tab: FC<PropsTab> = ({tab, setActive, active, index}) => {

	const {tab_style, tab_active} = styles()

	return <div id={index.toString()}
	            onClick={() => setActive(index)}
	            className={`${tab_style} ${active ? tab_active : ''}`}>
		{tab.tabNumber}
	</div>

}
export default Tab;