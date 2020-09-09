import React, {} from 'react';
import { keyboardSetEN } from '../data.structure/data/keyboardSets';
import KeyboardLayoutStyles, { toUnits } from './KeyboardLayoutStyles';

const keyboardSet = keyboardSetEN.setKeys;

const differentKeys: { [key: string]: { width: number, text: string | React.ReactElement } } = {
    'SPACE': {
        width: 2,
        text: '',
    }, // кнопки, ширина яких відрізняється від звичайної у відносних одиницях
};

const keyCountByRow = [9, 10, 8]; // sum = keyboardSet.length
const k1 = 0.4; // розрахункова відстань між кнопками (відносно ширини кнопки)
const k2 = 0.4; // фактична відстань між кнопками (відносно ширини кнопки)
const k3 = 0.7; // висота кнопки відносно висоти ряду
//const k4 = 20; // співвідношення ширини блоку до висоти блоку

const { useStyles, sizeOfElements } = KeyboardLayoutStyles({
    keyboardSet,
    differentKeys,
    keyCountByRow,
    k1,
    k2,
    k3,
    //k4,
});

function KeyboardLayoutEN() {
    const classes = useStyles();

    const keys = keyboardSet.map(
        (key, i) => {
            let style = {};
            let width = differentKeys[key] && Math.round(differentKeys[key].width * (sizeOfElements.keyWidth + sizeOfElements.keySpace) - sizeOfElements.keySpace);
            if (width) style = { width:  toUnits(width) };
            return (
                <div className={classes.key} key={i} data-key={key} style={style}>
                    {differentKeys[key] ? differentKeys[key].text : key}
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
};

export default KeyboardLayoutEN;
