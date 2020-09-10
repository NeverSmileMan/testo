import { makeStyles, Theme } from '@material-ui/core/styles';
import { ISizeOfElementsInUnits } from '../functions/keyboardFunc';
import React from 'react';

export interface IDifferentKeys { // кнопки, які відрізняється від звичайних
    [key: string]: {
        width?: number;
        content?: string | React.ReactElement;
        attr?: IKeyAttr;
    };
}

export interface IKeyAttr {
    onClick?: React.EventHandler<any>;
    'data-next-lang'?: string;
    'data-key'?: string;
}

export const useStylesLayout = makeStyles((theme: Theme) => ({
    'layout': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& [class*=row]': {
            flexGrow: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxHeight: ({ keyHeight }: ISizeOfElementsInUnits) => keyHeight,
        },
        '& .row-1': {},
        '& .row-2': {},
        '& .row-3': {},
        '& .row-4': {},
    },
}));

export const useStylesKey = makeStyles((theme: Theme) => ({
    'layout': {
        '& .key': {
            border: '1px solid' + theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.3rem',
            fontSize: '1.1em',
            background:'#e4e4e4', 
            overflow: 'hidden',
            fontWeight: 400,
            height: '100%',
            width: ({ keyWidth }: ISizeOfElementsInUnits) => keyWidth,
            marginRight: ({ keySpace }: ISizeOfElementsInUnits) => keySpace,
            '&:last-child': {
                marginRight: '0px',
            },
        },
    },
}));
