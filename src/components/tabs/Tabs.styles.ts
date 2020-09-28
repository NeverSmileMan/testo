import { makeStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core";
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

export const styles = makeStyles( ( theme: Theme ) => createStyles( {
	tabStyle: {
		marginRight: '.2rem',
		width: `calc((100% - 1.6rem) / ${ MAX_NUMBER_OF_TABS })`,
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
		padding: 0
	},
	tabActive: {
		backgroundColor: theme.palette.primary.main,
		color: '#fff',
		outline: 'none',
	},
	headerTabs: {
		display: 'flex',
		width: '100%',
		paddingTop: '.4rem',
		boxSizing: 'border-box',
		height: '100%',
	}
} ) )
