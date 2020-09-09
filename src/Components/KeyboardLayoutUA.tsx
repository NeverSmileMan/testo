import React, {} from 'react';
import { keyboardSetUA } from '../data.structure/data/keyboardSets';
import KeyboardLayoutStyles, { toUnits } from './KeyboardLayoutStyles';

// const keys = keyboard.getSet('UA')?.map(
//     (key, i) => <div className='key' key={i} data-key={key}>{key}</div>
// );

// function KeyboardLayoutUA() {
//     if (!keys) return null;
//     return <div>{keys}</div>;
// }

const keyboardSet = keyboardSetUA.setKeys;

const differentKeys: {[key: string]: number} = {
    'SPACE': 3, // кнопки, ширина яких відрізняється від звичайної у відносних одиницях
};

const keyCountByRow = [12, 12, 10]; // sum = keyboardSet.length
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

function KeyboardLayoutUA() {
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
};

export default KeyboardLayoutUA;
