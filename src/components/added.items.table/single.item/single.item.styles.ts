import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesSingleItem = makeStyles((theme: Theme) =>
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
			display: 'flex',
			minWidth: '6em',
			textAlign: 'start',
			flexGrow: 1,
		},
		nthCol: {
			display: 'flex',
			width: '6em',
			justifyContent: 'flex-end',
			paddingRight: '2em',
			alignContent: 'center'
		},
		wrap: {
			display: 'flex',
			height: '100%',
			flexGrow: 1,
			alignItems: 'center',
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
