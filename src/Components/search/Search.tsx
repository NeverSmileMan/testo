import React, { useState, useEffect, useRef } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import ActiveInputService from '../../data.structure/ActiveInputService';
import Input from '../../data.structure/Input';
import List from './List';
import { IItem } from '../../data.structure/Item';

const input = Input.getInputListInstance();
const activeInputService = ActiveInputService.getInstance();

const ifFocus = () => ({isFocus: activeInputService.ifActiveInput(input) });
const getValue = () => input.getValue().replace(/ /g, '&nbsp;');
const onListSelect = input._onSelect.bind(input);

let setState: React.Dispatch<(isFocus: { isFocus: boolean }) => { isFocus: boolean }>;
let isFocus: boolean;
let ref: React.RefObject<HTMLDivElement>;
function changeState() {
    input.onFocusChange(() => setState(ifFocus));
    input.onChange(() => {
        if (ref.current) 
            ref.current.innerHTML = getValue();
        setState((state) => ({ ...state }));
    });
    return ifFocus();
}

type Props = {
    onSelect: (item: IItem) => void;
} & WithStyles;

function Search({ classes, onSelect }: Props) {
    [{ isFocus }, setState] = useState(changeState);
    ref = useRef(null);

    useState(() => input.onSelect(onSelect));

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = getValue();
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    }, []);

    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : ''}`}>
            </div>
            <List filter={input.getValue()} onSelect={onListSelect}/>
        </div>
    );
}

export default withStyles(styles)(Search);
