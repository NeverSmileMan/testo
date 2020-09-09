import { makeStyles, Theme } from '@material-ui/core/styles';

export interface IDifferentKeys {
    [key: string]: {
        width: number;
        text: string | React.ReactElement;
        attr?: {
            onClick?: Function;
            'data-next-lang'?: string;
            'data-key'?: string;
        };
    };
}

export interface IKeyboardOptions {
    keyboardSet: string[];
    keyCountByRow: number[];
    differentKeys: { [key: string]: { width: number, text: string | React.ReactElement } };
    k1: number;
    k2: number;
    k3: number;
}

interface ISizeOfElements {
    keyWidth: number,
    keyHeight: number,
    keySpace: number,
}

interface ISizeOfElementsInUnits {
    keyWidth: string,
    keyHeight: string,
    keySpace: string,
}

export function toUnits(value: number, unit: 'px' | '%' = '%') {
    return `${value}${unit}`;
}

export function getSizeOfElements(options: IKeyboardOptions) {
    const { keyboardSet, differentKeys,  keyCountByRow, k1, k2, k3 } = options;
    const additionalCount = Object.values(differentKeys).reduce((r, value) => r + value.width - 1, 0);
    const keyCount = keyboardSet.length + additionalCount;
    const rowCount = keyCountByRow.length;
    const keyWidth = Math.round(100 * rowCount / keyCount / ( 1 + k1));
    const keyHeight = 100 / rowCount * k3;
    const keySpace = Math.round(keyWidth * k2);

    return {
        keyWidth,
        keyHeight,
        keySpace,
    };
}

export function getSizeOfElementsInUnits(sizeOfElements: ISizeOfElements) {
    const sizeInUnits = {
        keyWidth: toUnits(sizeOfElements.keyWidth),
        keyHeight: toUnits(sizeOfElements.keyHeight),
        keySpace: toUnits(sizeOfElements.keySpace),
    };

    return sizeInUnits;
}

//function KeyboardLayoutStyles(options: IKeyboardOptions) {
function KeyboardLayoutStyles() {
    // const { keyboardSet, differentKeys,  keyCountByRow, k1, k2, k3 } = options;

    // function getSizeOfElements() {
    //     const additionalCount = Object.values(differentKeys).reduce((r, value) => r + value.width - 1, 0);
    //     const keyCount = keyboardSet.length + additionalCount;
    //     const rowCount = keyCountByRow.length;
    //     const keyWidth = Math.round(100 * rowCount / keyCount / ( 1 + k1));
    //     const keyHeight = 100 / rowCount * k3;
    //     const keySpace = Math.round(keyWidth * k2);
    
    //     return {
    //         keyWidth,
    //         keyHeight,
    //         keySpace,
    //     };
    // }
    
    // const sizeOfElements = getSizeOfElements();

    // const sizeInUnits = {
    //     keyWidth: toUnits(sizeOfElements.keyWidth),
    //     keyHeight: toUnits(sizeOfElements.keyHeight),
    //     keySpace: toUnits(sizeOfElements.keySpace),
    // }

    const useStyles = makeStyles((theme: Theme) => ({
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
                // '&:first-child': {
                //     alignItems: 'flex-start',
                // },
                // '&:last-child': {
                //     alignItems: 'flex-end',
                // },
            },
            '& .row-1': {

            },
            '& .row-2': {

            },
            '& .row-3': {

            },
        },
    
        'key': {
            border: '1px solid' + theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.3rem', //'.15rem',
            fontSize: '1.1em',
            background:'#e4e4e4', 
            overflow: 'hidden',
            fontWeight: 400,
            //height: sizeInUnits.keyHeight,
            height: '100%',
            width: ({ keyWidth }: ISizeOfElementsInUnits) => keyWidth,
            marginRight: ({ keySpace }: ISizeOfElementsInUnits) => keySpace,
            '&:last-child': {
                marginRight: '0px',
            },
        },
    }));

    // return { useStyles, sizeOfElements };
    return useStyles;
}

export default KeyboardLayoutStyles;
