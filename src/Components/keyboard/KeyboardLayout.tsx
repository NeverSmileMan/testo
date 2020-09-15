import React from 'react';
import { getSizeOfElements, getSizeOfElementsInUnits, IKeyboardOptions } from '../../functions/keyboardFunc';
import getKeyboardStyles, { IDifferentKeys } from './KeyboardStyles';
import KeyboardKeys from './KeyboardKeys';
import { withStyles, WithStyles, ClassKeyInferable } from '@material-ui/styles';

interface keyboardLayoutProps {
    options: IKeyboardOptions;
    diffKeys?: IDifferentKeys;
    keyClassName?: string;
}

function KeyboardLayout({ options, diffKeys = {}, keyClassName }: keyboardLayoutProps) {

    Object.assign(options.differentKeys, diffKeys);
    const sizeOfElements = getSizeOfElements(options);
    const sizeOfElementsInUnits = getSizeOfElementsInUnits(sizeOfElements);
    const styles = getKeyboardStyles(sizeOfElementsInUnits);

    const { keyCountByRow, keyboardSet, differentKeys } = options;
    const keys = KeyboardKeys({ keyboardSet, differentKeys, sizeOfElements, keyClassName });
    
    const rows = keyCountByRow.map((count, i) =>
        <div className={`row-${i + 1}`} key={i}>
            {keys.splice(0, count)}
        </div>
    );
    
    function Layout({ classes }: WithStyles<ClassKeyInferable<{}, any>>) {
        return (
            <div className={classes.layout}>
                {rows}
            </div>
        );
    };

    return withStyles(styles)(Layout);
};
    
export default KeyboardLayout;
