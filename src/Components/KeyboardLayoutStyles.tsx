import { makeStyles } from '@material-ui/core/styles';

interface IKeyboardOptions {
    keyboardSet: string[];
    keyCountByRow: number[];
    differentKeys: {[key: string]: number};
    k1: number; 
    k2: number; 
    k3: number; 
    //k4: number;
}

export function toUnits(value: number, unit: 'px' | '%' = '%') {
    return `${value}${unit}`;
}

function KeyboardLayoutStyles(options: IKeyboardOptions) {

    const { keyboardSet, differentKeys,  keyCountByRow, k1, k2, k3 } = options;

    function getSizeOfElements() {
        const additionalCount = Object.values(differentKeys).reduce((r, value) => r + value - 1, 0);
        const keyCount = keyboardSet.length + additionalCount;
        const rowCount = keyCountByRow.length;
        const keyWidth = Math.round(100 * rowCount / keyCount / ( 1 + k1));
        const keyHeight = Math.round(k3 * 100);
        const keySpace = Math.round(keyWidth * k2);
        //const paddingVertical = Math.round((1 - k3) * 100 / 2 / k4);
    
        return {
            keyWidth,
            keyHeight,
            keySpace,
            //paddingVertical,
        };
    }
    
    const sizeOfElements = getSizeOfElements();

    const sizeInUnits = {
        keyWidth: toUnits(sizeOfElements.keyWidth),
        keyHeight: toUnits(sizeOfElements.keyHeight),
        keySpace: toUnits(sizeOfElements.keySpace),
        //paddingVertical: toUnits(sizeOfElements.paddingVertical),
    }

    const useStyles = makeStyles({
        'layout': {
            flex: '1 0 0',
            display: 'flex',
            flexDirection: 'column',
            //paddingTop: sizeInUnits.paddingVertical,
            //paddingBottom: sizeInUnits.paddingVertical,
            '& [class*=row]': {
                flexGrow: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '& .row-1': {
                //paddingLeft: '3%',
            },
            '& .row-2': {
                //paddingLeft: '7%',
            },
            '& .row-3': {
                //paddingLeft: '3%',
            },
        },
    
        'key': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '.15rem',
            fontSize: '1.1em',
            background:'#e4e4e4', 
            overflow: 'hidden',
            fontWeight: 400,
            height: sizeInUnits.keyHeight,
            width: sizeInUnits.keyWidth,
            marginRight: sizeInUnits.keySpace,
            '&:last-child': {
                marginRight: '0px',
            },
        },
    });

    return { useStyles, sizeOfElements };
}

export default KeyboardLayoutStyles;
