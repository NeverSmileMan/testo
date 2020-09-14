import React, { useState, useEffect, useRef } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraDisplay';
import ActiveInputService from '../../data.structure/ActiveInputService';
import Input from '../../data.structure/Input';

const input = Input.getInputNumberInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => activeInputService.ifActiveInput(input);
const getValue = () => (input.getValue() / 1000).toFixed(3);

let setState: React.Dispatch<() => boolean>;
let isFocus: boolean;
let ref: React.RefObject<HTMLDivElement>;
function changeState() {
    input.onFocusChange(() => setState(ifFocus));
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = getValue();
    });
    return ifFocus();
}

function TaraDisplay({ classes }: WithStyles) {
    [isFocus, setState] = useState(changeState);
    ref = useRef(null);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = getValue();
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    });
    
    return (
        <div className={classes.wrapper}>
            <div
                ref={ref}
                className={'input ' + (isFocus ? 'focus' : '')}>
            </div>
        </div>
    );
};

export default withStyles(styles)(TaraDisplay);
