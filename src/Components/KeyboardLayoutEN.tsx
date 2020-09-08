import React from 'react';
import { keyboardSetEN } from '../data.structure/data/keyboardSets';
import { makeStyles } from '@material-ui/styles';

const keyboardSet = keyboardSetEN.setKeys;

const differentKeys: {[key: string]: number} = {
    'A': 1.5, // кнопки, ширина яких відрізняється від звичайної у відносних одиницях 
};

const keyCountByRow = [8, 9, 9]; // sum = keyboardSet.length
const k1 = 0.7; // розрахункова (середня) відстань між кнопками (відносно ширини кнопки)
const k2 = 0.2; // фактична відстань між кнопками (відносно ширини кнопки)

function getSizeOfElements() {
    const keyCount = keyboardSet.length;
    const rowCount = keyCountByRow.length;
    const keyWidth = Math.ceil(100 * rowCount / keyCount / (1 + k1));
    const keySpace = Math.floor(keyWidth * k2);
    const paddingVertical = Math.floor(k2 * keyWidth);

    return {
        keyWidth,
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
            justifyContent: 'center',
            alignItems: 'center',

        },
        '& .row-1': {},
        '& .row-2': {},
        '& .row-3': {},
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
		height: '80%',
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
            let width = differentKeys[key] && differentKeys[key] * sizeOfElements.keyWidth;
            if (width) style = { width:  toUnits(width) };
            return (
                <div className={classes.key} key={i} data-key={key} style={style}>
                    {key}
                </div>
            );
        }
    );

    const rows = keyCountByRow.map((count, i) => 
        <div className={`row-${i}`} key={i}>
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
