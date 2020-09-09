import React, {} from 'react';
import { keyboardSetNUMS } from '../data.structure/data/keyboardSets';
import KeyboardLayoutStyles, { IDifferentKeys, IKeyboardOptions, toUnits, getSizeOfElements, getSizeOfElementsInUnits } from './KeyboardLayoutStyles';

const keyboardSet = keyboardSetNUMS.setKeys;

const differentKeys: IDifferentKeys = {
    '0': {
        width: 3,
        text: '0',
    }, // кнопки, ширина яких відрізняється від звичайної у відносних одиницях
};

const keyCountByRow = [3, 3, 3, 1]; // sum = keyboardSet.length
const k1 = 0.4; // розрахункова відстань між кнопками (відносно ширини кнопки)
const k2 = 0.4; // фактична відстань між кнопками (відносно ширини кнопки)
const k3 = 0.7; // висота кнопки відносно висоти ряду
//const k4 = 20; // співвідношення ширини блоку до висоти блоку

const options: IKeyboardOptions = {
    keyboardSet,
    differentKeys,
    keyCountByRow,
    k1,
    k2,
    k3,
};

const sizeOfElements = getSizeOfElements(options);

const sizeOfElementsInUnits = getSizeOfElementsInUnits(sizeOfElements);
const useStyles = KeyboardLayoutStyles();



// const keys = keyboard.getSet('NUMS')?.map(
//     (key, i) => <div className='key' key={i} data-key={key}>{key}</div>
// );

// function KeyboardLayoutNUMS() {
//     if (!keys) return null;
//     return <div>{keys}</div>;
// }

function KeyboardLayoutNUMS() {
    const classes = useStyles(sizeOfElementsInUnits);

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

export default KeyboardLayoutNUMS;
