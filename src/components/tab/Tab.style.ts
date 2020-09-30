import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';

interface StyleProps {
	MAX_NUMBER_OF_TABS: number;
	active: boolean;
}

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tabStyle: (props: StyleProps) => ({
			marginRight: '5px',
			width: `calc((100% - 30px) / ${props.MAX_NUMBER_OF_TABS})`,
			height: '100%',
			borderRadius: '10px 10px 0 0',
			fontSize: '30px',
			fontWeight: 'bolder',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: 'none',
			padding: 0,
			outline: 'none',
			color: props.active ? '#fff' : '#333',
			backgroundColor: props.active ? theme.palette.primary.main : '#e4e4e4',
		}),
	}),
);
