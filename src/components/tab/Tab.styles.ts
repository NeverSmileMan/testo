import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { MAX_NUMBER_OF_TABS } from '../../enum/variables';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
		tabActive: {
			backgroundColor: theme.palette.primary.main,
			color: '#fff',
			outline: 'none',
		},
	}),
);
