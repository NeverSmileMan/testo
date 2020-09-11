import React from 'react';
import { getSizeOfElements, getSizeOfElementsInUnits, IKeyboardOptions } from '../../functions/keyboardFunc';
import { getKeyboardKeyStyles, getKeyboardLayoutStyles, IDifferentKeys } from './KeyboardStyles';
import KeyboardKeys from './KeyboardKeys';
import { withStyles, createStyles } from '@material-ui/styles';

interface keyboardLayoutProps {
    options: IKeyboardOptions;
    diffKeys?: IDifferentKeys;
    keyStyleName?: string;
}

function KeyboardLayout({ options, diffKeys = {}, keyStyleName }: keyboardLayoutProps) {

    Object.assign(options.differentKeys, diffKeys);
    const sizeOfElements = getSizeOfElements(options);
    const sizeOfElementsInUnits = getSizeOfElementsInUnits(sizeOfElements);
    const stylesLayout = createStyles(getKeyboardLayoutStyles(sizeOfElementsInUnits));
    const stylesKey = createStyles(getKeyboardKeyStyles(sizeOfElementsInUnits, keyStyleName));

    const { keyCountByRow, keyboardSet, differentKeys } = options;
    const keys = KeyboardKeys({ keyboardSet, differentKeys, sizeOfElements });
    
    const rows = keyCountByRow.map((count, i) =>
        <div className={`row-${i + 1}`} key={i}>
            {keys.splice(0, count)}
        </div>
    );
    
    function Layout(props: { classes: { [key: string]: string } }) {
        const className = props.classes.layout;
        return (
            <div className={className}>
                {rows}
            </div>
        );
    };

    return withStyles(stylesKey)(
            withStyles(stylesLayout)(Layout));
};
    
export default KeyboardLayout;
