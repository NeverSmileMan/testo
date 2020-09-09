import React, { useState } from 'react';
import { keyboardSetFUNC } from '../data.structure/data/keyboardSets';
import KeyboardLayoutStyles, { IDifferentKeys, IKeyboardOptions, toUnits, getSizeOfElements, getSizeOfElementsInUnits } from './KeyboardLayoutStyles';

// const keyboard = KeyboardObject.getInstance();

// const keys = keyboard.getSet('FUNC')?.map(
//     (key, i) => <div className='key' key={i} data-key={key}>{key}</div>
// );

// function KeyboardLayoutFUNC() {
//     if (!keys) return null;
//     return <div>{keys}</div>;
// }

const keyboardSet = keyboardSetFUNC.setKeys;
keyboardSet.splice(2, 1);
keyboardSet.push('LANG');

const differentKeys: IDifferentKeys = {
    'CLEAR': {
        width: 1,
        text: 'DEL', 
    },
    'BACKSPACE': {
        width: 1,
        text: <span>&#8592;</span>,
    }, 
    'LANG': {
        width: 1,
        text: 'EN',
    }, // кнопки, ширина яких відрізняється від звичайної у відносних одиницях
};

const keyCountByRow = [1, 1, 1]; // sum = keyboardSet.length
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

function KeyboardLayoutFUNC({ diffKeys }: { diffKeys?: IDifferentKeys }) {
    useState(() => Object.assign(differentKeys, diffKeys));
    const classes = useStyles(sizeOfElementsInUnits);

    const keys = keyboardSet.map(
        (key, i) => {
            let style = {};
            let attr = { 'data-key': key } as any;
            let text: string | React.ReactElement = '';
            let width = differentKeys[key] && Math.round(differentKeys[key].width * (sizeOfElements.keyWidth + sizeOfElements.keySpace) - sizeOfElements.keySpace);
            if (width) style = { width:  toUnits(width) };
            if (differentKeys[key]) {
                attr = differentKeys[key].attr || attr;
                text = differentKeys[key].text || key;
            }
            return (
                <div
                    className={classes.key}
                    key={i}
                    data-key={key}
                    style={style}
                    {...attr}>
                    {text}
                </div>
            );
        }
    );

    // keys.push(
    //     <div className={classes.key} key={2} data-next-lang={'EN'}>
    //         {'EN'}
    //     </div>
    // );

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

export default KeyboardLayoutFUNC;
