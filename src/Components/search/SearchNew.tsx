import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import ActiveInputService from '../../data.structure/ActiveInputService';
import { InputList, IInputList, IStateInput } from '../../data.structure/Input';
import { IItem } from '../../data.structure/Item';
import List from './List';

const activeInputService = ActiveInputService.getInstance();

interface IState {
    input: IInputList;
}

let setState: React.Dispatch<() => IState>;
let input: IInputList;
let ref: React.RefObject<HTMLDivElement>;
let onListSelect: (item: IItem) => void;
let attachInput: () => void;
let refreshInput: () => void;

function changeState(callbacks: Props['callbacks']) {
    const input: IInputList = new InputList();
    input.onFocusChange(() => setState(() => ({ input })));
    input.onChange(() => setState(() => ({ input })));
    input.onSelect(callbacks.onSelect);
    callbacks.resetSearch(() => input.setValue(''));
    onListSelect = input._onSelect;
    attachInput = () => {
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    };
    refreshInput = () => {
        if (ref.current) ref.current.innerHTML = input.getValueHTML();
    };
    return { input };
}

type Props = {
    callbacks: {
        onSelect: (item: IItem) => void;
        resetSearch: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {
    [{ input }, setState] = useState<IState>(() => changeState(callbacks));
    ref = useRef(null);

    useEffect(attachInput, []);
    
    const { isFocus, value } = input.getStateInput();

    useEffect(refreshInput);
    
    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : ''}`}>&nbsp;
            </div>
            <List filter={value} onSelect={onListSelect}/>
        </div>
    );
}

export default withStyles(styles)(Search);
