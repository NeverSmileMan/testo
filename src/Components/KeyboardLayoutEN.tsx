import React from 'react';
import { keyboardSetEN } from '../data.structure/data/keyboardSets';
import { makeStyles } from '@material-ui/styles';

const keyboardSet = keyboardSetEN.setKeys;

const differentKeys: {[key: string]: number} = {
    'A': 2, // кнопки, ширина яких відрізняється від звичайної у відносних одиницях
};

const keyCountByRow = [8, 9, 9]; // sum = keyboardSet.length
const k1 = 0.4; // розрахункова відстань між кнопками (відносно ширини кнопки)
const k2 = 0.4; // фактична відстань між кнопками (відносно ширини кнопки)
const k3 = 0.7; // висота кнопки відносно висоти ряду
const k4 = 20; // співвідношення ширини блоку до висоти блоку

function getSizeOfElements() {
    const additionalCount = Object.values(differentKeys).reduce((r, value) => r + value - 1, 0);
    const keyCount = keyboardSet.length + additionalCount;
    const rowCount = keyCountByRow.length;
    const keyWidth = Math.round(100 * rowCount / keyCount / ( 1 + k1));
    const keyHeight = Math.round(k3 * 100);
    const keySpace = Math.round(keyWidth * k2);
    const paddingVertical = Math.round((1 - k3) * 100 / 2 / k4);

    return {
        keyWidth,
        keyHeight,
        keySpace,
        paddingVertical,
    };
}

const sizeOfElements = getSizeOfElements();

function toUnits(value: number, unit: 'px' | '%' = '%') {
    return `${value}${unit}`;
}

const sizeInUnits = {
    keyWidth: toUnits(sizeOfElements.keyWidth),
    keyHeight: toUnits(sizeOfElements.keyHeight),
    keySpace: toUnits(sizeOfElements.keySpace),
    paddingVertical: toUnits(sizeOfElements.paddingVertical),
}

const useStyles = makeStyles({
    'layout': {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: sizeInUnits.paddingVertical,
        paddingBottom: sizeInUnits.paddingVertical,
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

function KeyboardLayoutEN() {
    const classes = useStyles();

    const keys = keyboardSet.map(
        (key, i) => {
            let style = {};
            let width = differentKeys[key] && Math.round(differentKeys[key] * (sizeOfElements.keyWidth + sizeOfElements.keySpace) - sizeOfElements.keySpace);
            if (width) style = { width:  toUnits(width) };
            return (
                <div className={classes.key} key={i} data-key={key} style={style}>
                    {key}
                </div>
            );
        }
    );

    const rows = keyCountByRow.map((count, i) => 
        <div className={`row-${i + 1}`} key={i}>
            {keys.splice(0, count)}
        </div>
    );

    return (
        <div className={classes.layout}>
            {rows}
        </div>
    );
}

export default KeyboardLayoutEN;
