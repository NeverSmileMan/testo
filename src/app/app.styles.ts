import { makeStyles } from '@material-ui/styles';

export const useStylesApp = makeStyles({
	scale: {
		width: '100%',
		height: '15.8854%',
		backgroundColor: 'gray',
		display: 'flex',
	},
	mainWrap: {
		width: '100%',
		height: '84.1146%',
	},
	main: {
		width: '100%',
		height: '70%',
	},
	keyboardWrap: {
		width: '100%',
		height: '30%',
	},

	'@global': {
		'::-webkit-scrollbar': {
			width: '40px',
		},
		'::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 5px #e4e4e4',
		},
		'::-webkit-scrollbar-thumb': {
			background: '#fff',
			borderRadius: '10px',
		},
		'#root': {
			width: '100%',
			height: '100%',
		},
		'html, body': {
			width: '100%',
			height: '100%',
			margin: 0,
			padding: 0,
			fontFamily: 'Arial',
			fontSize: '24px',
		},
		':active, :hover, :focus': {
			outline: 0,
			outlineOffset: 0,
		},
	},
});
