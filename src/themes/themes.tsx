import { createMuiTheme, Theme } from '@material-ui/core';

type IThemes = {
    [key in ThemesNames]: Theme;
}

export type ThemesNames = 'default' | 'silpo' | 'fora';

const themes: IThemes = {} as IThemes;

themes.default = createMuiTheme({
    palette: {
        primary: {
            main: '#0099FF',
            light: '#7ecbff',
        },
        secondary: {
            main: '#d7d7d7',
            dark: 'gray',
            light: '#e4e4e4',
        },
    },
});

themes.silpo = createMuiTheme({
    palette: {
        primary: {
            main: '#ff8522',
            light: '#ffc595',
        },
        secondary: {
            main: '#d7d7d7',
            dark: 'gray',
            light: '#e4e4e4',
        },
    },
});

themes.fora = createMuiTheme({
    palette: {
        primary: {
            main: '#76b72f',
            light: '#9db682',
        },
        secondary: {
            main: '#d7d7d7',
            dark: 'gray',
            light: '#e4e4e4',
        },
    },
});

export default themes;
