import { makeStyles } from "@material-ui/styles";
import { createStyles, Theme } from "@material-ui/core";
import { MAX_NUMBER_OF_TABS } from "../../enum/variables";

export const styles = makeStyles( ( theme: Theme ) => createStyles( {
	tabStyle: {
		marginRight: '5px',
		width: `calc((100% - 30px) / ${ MAX_NUMBER_OF_TABS })`,
		height: '100%',
		borderRadius: '10px 10px 0 0',
		fontSize: '30px',
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
		paddingTop: '8px',
		boxSizing: 'border-box',
		height: '100%',
	}
} ) )
