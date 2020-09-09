import { makeStyles, Theme } from '@material-ui/core/styles';

interface IKeyboardOptions {
    keyboardSet: string[];
    keyCountByRow: number[];
    differentKeys: { [key: string]: { width: number, text: string | React.ReactElement } };
    k1: number;
    k2: number;
    k3: number;
}

export function toUnits(value: number, unit: 'px' | '%' = '%') {
    return `${value}${unit}`;
}

function KeyboardLayoutStyles(options: IKeyboardOptions) {

    const { keyboardSet, differentKeys,  keyCountByRow, k1, k2, k3 } = options;

    function getSizeOfElements() {
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
    
    const sizeOfElements = getSizeOfElements();

    const sizeInUnits = {
        keyWidth: toUnits(sizeOfElements.keyWidth),
        keyHeight: toUnits(sizeOfElements.keyHeight),
        keySpace: toUnits(sizeOfElements.keySpace),
    }

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
                maxHeight: sizeInUnits.keyHeight,
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
            width: sizeInUnits.keyWidth,
            marginRight: sizeInUnits.keySpace,
            '&:last-child': {
                marginRight: '0px',
            },
        },
    }));

    return { useStyles, sizeOfElements };
}

export default KeyboardLayoutStyles;
