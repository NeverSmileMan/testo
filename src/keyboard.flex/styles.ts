import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesKeyboard = makeStyles({
	keyboard: {
		height: '100%',
		width: '100%',
		padding: '0.5em',
		display: 'flex',
		backgroundColor: '#fff',
		boxSizing: 'border-box',
		justifyContent: 'space-between',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: '77fr 17fr 6fr',
		gridTemplateRows: '100%',
		gridGap: '0.4em',
		width: '100%',
		height: '100%',
	},
	alphabet: {
		gridColumn: '1',
		gridRow: '1',
	},
	numeric: {
		gridColumn: '2',
		gridRow: '1',
	},
	special: {
		gridColumn: '3',
		gridRow: '1',
	},
});



export const useStylesAlphabet = makeStyles({
	keyboardAlphabet: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
		boxSizing: 'border-box',
	},
	row: {
		display: 'flex',
		flexGrow: 1,
		boxSizing: 'border-box',
	},
	spacer: {
		margin: '0.2em',
	},
	offset: {
		width: '30%',
	},
	space: {
		width: '300%',
	},
});


export const useStylesNumeric = makeStyles((theme: Theme) =>
	createStyles({
		btnNumeric: {
			background: theme.palette.grey[400],
			margin: '0',
		},
		keyboardNumeric: {
			display: 'grid',
			gridGap: '0.2em',
			gridTemplateColumns: 'repeat(3, 1fr)',
			gridTemplateRows: 'repeat(4, 1fr)',
			height: '100%',
			boxSizing: 'border-box',
		},
		nkey_0: {
			gridColumn: '1',
			gridRow: '1',
		},
		nkey_1: {
			gridColumn: '2',
			gridRow: '1',
		},
		nkey_2: {
			gridColumn: '3',
			gridRow: '1',
		},
		nkey_3: {
			gridColumn: '1',
			gridRow: '2',
		},
		nkey_4: {
			gridColumn: '2',
			gridRow: '2',
		},
		nkey_5: {
			gridColumn: '3',
			gridRow: '2',
		},
		nkey_6: {
			gridColumn: '1',
			gridRow: '3',
		},
		nkey_7: {
			gridColumn: '2',
			gridRow: '3',
		},
		nkey_8: {
			gridColumn: '3',
			gridRow: '3',
		},
		nkey_9: {
			gridColumn: '1 / 4',
			gridRow: '4',
		},
	}),
);


export const useStylesButton = makeStyles((theme: Theme) =>
	createStyles({
		btn: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '.15rem',
			fontSize: '1.1em',
			background: theme.palette.grey[300],
			overflow: 'hidden',
			fontWeight: theme.typography.fontWeightMedium,
			textTransform: 'uppercase',
			width: '100%',
			marginLeft: '0.15em',
			marginRight: '0.15em',
		},
	}),
);

export const useStylesSpecial = makeStyles({
	keyboardSpecial: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'border-box',
	},
	keyboardSpecialGrid: {
		display: 'grid',
		gridGap: '0.4em',
		gridTemplateColumns: 'repeat(1, 1fr)',
		gridTemplateRows: 'repeat(3, 1fr)',
	},
	skey_0: {
		gridColumn: '1',
		gridRow: '1',
	},
	skey_1: {
		gridColumn: '1',
		gridRow: '2',
	},
	skey_2: {
		gridColumn: '1',
		gridRow: '3',
	},
	btnSpecial: {
		display: 'flex',
		margin: '0px',
	},
	clearBtn: {
		fontSize: '0.8em',
	},
});