import { createMuiTheme, Theme } from '@material-ui/core/styles';

type ThemesObj = {
	[property: string]: Theme;
};
export const themes: ThemesObj = {};

themes.default = createMuiTheme({
	palette: {
		primary: {
			main: '#0099FF',
		},
		secondary: {
			main: '#d7d7d7',
		},
	},
	typography: {
		fontFamily: "'Arial','Helvetica', sans-serif",
	},
});
themes.silpo = createMuiTheme({
	palette: {
		primary: {
			main: '#ff8522',
		},
		secondary: {
			main: '#d7d7d7',
		},
	},
	typography: {
		fontFamily: "'Arial','Helvetica', sans-serif",
	},
});
themes.fora = createMuiTheme({
	palette: {
		primary: {
			main: '#76b72f',
		},
		secondary: {
			main: '#ef036',
		},
	},
	typography: {
		fontFamily: "'Arial','Helvetica', sans-serif",
	},
});
