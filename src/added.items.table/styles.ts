import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesSinleItem = makeStyles((theme: Theme) =>
	createStyles({
		row: {
			display: 'flex',
			flexDirection: 'row',
			minHeight: '2em',
			alignItems: 'center',
			borderBottom: `1px solid ${theme.palette.grey[700]}`,
			boxSizing: 'border-box',
			background: theme.palette.grey[100],
			'& span': {
				paddingLeft: '0.4em',
				display: 'inline-block',
			},
		},
		active: {
			background: theme.palette.grey[400],
		},
		firstCol: {
			minWidth: '6em',
			textAlign: 'start',
			flexGrow: 1,
		},
		nthCol: {
			width: '6em',
			textAlign: 'right',
			paddingRight: '2em',
		},
		font: {
			fontFamily: theme.typography.fontFamily,
			fontWeight: theme.typography.fontWeightRegular,
			color: theme.palette.grey.A400,
			fontStyle: 'normal',
			fontSize: '0.7em',
			lineHeight: 'normal',
		},
	}),
);

export const useStylesTable = makeStyles((theme: Theme) =>
	createStyles({
		bodyContainer: {
			textAlign: 'start',
			height: '83%',
			overflowY: 'auto',
			padding: '0px',
			margin: '0px',
			display: 'flex',
			fontSize: '24px',
			flexDirection: 'column',
			flexGrow: 1,
			backgroundColor: theme.palette.grey[500],
		},
	}),
);
