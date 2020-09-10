import React, { useState } from 'react';
import { getSizeOfElements, getSizeOfElementsInUnits, IKeyboardOptions } from '../functions/keyboardFunc';
import { useStylesKey, useStylesLayout, IDifferentKeys } from './KeyboardLayoutStyles';
import KeyboardKeys from './KeyboardKeys';

interface keyboardLayoutProps {
    options: IKeyboardOptions;
    diffKeys?: IDifferentKeys;
}

function KeyboardLayout({ options, diffKeys = {} }: keyboardLayoutProps) {
    useState(() => Object.assign(options.differentKeys, diffKeys));
    
    const sizeOfElements = getSizeOfElements(options);
    const sizeOfElementsInUnits = getSizeOfElementsInUnits(sizeOfElements);
    
    const classesLayout = useStylesLayout(sizeOfElementsInUnits);
    const classesKey = useStylesKey(sizeOfElementsInUnits);
    
    const { keyCountByRow, keyboardSet, differentKeys } = options;
    const keys = KeyboardKeys({ keyboardSet, differentKeys, sizeOfElements });
    
    const rows = keyCountByRow.map((count, i) =>
        <div className={`row-${i + 1}`} key={i}>
            {keys.splice(0, count)}
        </div>
    );
        
    const className = classesLayout.layout + ' ' + classesKey.layout;
    return (
        <div className={className}>
            {rows}
        </div>
    );
};
    
export default KeyboardLayout;
