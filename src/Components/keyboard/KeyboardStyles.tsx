import { Theme } from '@material-ui/core/styles';
import { ISizeOfElementsInUnits } from '../../functions/keyboardFunc';
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

export function getKeyboardStyles(sizeOfElementsInUnits: ISizeOfElementsInUnits) {
    return (theme: Theme) => ({
        'layout': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '& [class*=row]': {
                flexGrow: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxHeight: sizeOfElementsInUnits.keyHeight,
            },
            '& .row-1': {},
            '& .row-2': {},
            '& .row-3': {},
            '& .row-4': {},
            '& .key': {
                color: 'white', //'black', //theme.palette.secondary.dark,
                border: '1px solid',
                borderColor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.3rem',
                fontSize: '1.1rem',
                background: theme.palette.secondary.dark, //theme.palette.secondary.light,
                overflow: 'hidden',
                fontWeight: 600,
                height: '100%',
                width: sizeOfElementsInUnits.keyWidth,
                marginRight: sizeOfElementsInUnits.keySpace,
                '&:last-child': {
                    marginRight: '0px',
                },
            },
            '& .taraFunc': {
                borderWidth: '2px',
                color: 'white',
                background: theme.palette.primary.main,
            },
            '& .taraFix': {
                borderWidth: '2px',
                borderRadius: '0.7rem',
                fontSize: '1.2rem',
            },
        },
    });
}
