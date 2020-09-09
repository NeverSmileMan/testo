import { ThemesNames } from '../../themes/themes';

export interface IConfig {
    maxOrdersCount: number;
    themeName: ThemesNames;
}

export const config: IConfig = {
    maxOrdersCount: 6,
    themeName: 'silpo', //''default',
}

export interface IEnv {
    displayWidth: number;
    displayHeight: number;
}
