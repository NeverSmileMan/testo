import { makeStyles } from '@material-ui/styles';

interface StyleProps {
	MAX_NUMBER_OF_TABS: number;
}

export const useStyles = makeStyles({
	tabStyle: {
		marginRight: '5px',
		width: (props: StyleProps) => `calc((100% - 30px) / ${props.MAX_NUMBER_OF_TABS})`,
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
