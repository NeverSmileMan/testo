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
        },
        secondary: {
            main: '#d7d7d7',
        },
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
});

export default themes;
