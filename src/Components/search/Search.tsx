import React, { useState, useEffect, useRef } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import ActiveInputService from '../../data.structure/ActiveInputService';
import Input from '../../data.structure/Input';
import List from './List';

const input = Input.getInputListInstance();
const activeInputService = ActiveInputService.getInstance();
const ifFocus = () => activeInputService.ifActiveInput(input);
const getValue = () => input.getValue().replace(/ /g, '&nbsp;');

let setState: React.Dispatch<() => boolean>;
let ref: React.RefObject<HTMLDivElement>;
function changeState() {
    input.onFocusChange(() => setState(ifFocus));
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = getValue();
    });
    return ifFocus();
}

function Search({ classes}: WithStyles) {
    let isFocus;
    [isFocus, setState] = useState(changeState);
    ref = useRef(null);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = getValue();
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    });

    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : ''}`}>
            </div>
            <List />
        </div>
    );
}

export default withStyles(styles)(Search);
