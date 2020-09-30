import { makeStyles } from '@material-ui/styles';
import { MAX_NUMBER_OF_TABS } from '../../enum/variables';

export const useStyles = makeStyles({
	tabStyle: {
		marginRight: '5px',
		width: `calc((100% - 30px) / ${MAX_NUMBER_OF_TABS})`,
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
	},
	headerTabs: {
		display: 'flex',
		width: '100%',
		paddingTop: '8px',
		boxSizing: 'border-box',
		height: '100%',
	},
});
