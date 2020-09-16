import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import ActiveInputService from '../../data.structure/ActiveInputService';
import { InputList, IInputList } from '../../data.structure/Input';
import { IItem } from '../../data.structure/Item';
import List from './List';

const activeInputService = ActiveInputService.getInstance();

interface IState {
    input: IInputList;
    onListSelect: (item: IItem) => void;
}

const getState = (input: IInputList) => ({
    isFocus: input.ifFocus(),
    value: input.getValue(),
    valueHTML: input.getValueHTML(),
});

let setState: React.Dispatch<(state: IState) => IState>;
let state: IState;
let ref: React.RefObject<HTMLDivElement>;
function changeState(callbacks: Props['callbacks']) {
    const input: IInputList = new InputList();
    input.onFocusChange(() => setState((state) => ({ ...state })));
    input.onChange(() => setState((state) => ({ ...state })));
    input.onSelect(callbacks.onSelect);
    callbacks.resetSearch(() => input.setValue(''));
    const onListSelect = (item: IItem) => input._onSelect(item);
    return { input, onListSelect };
}

type Props = {
    callbacks: {
        onSelect: (item: IItem) => void;
        resetSearch: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {
    [state, setState] = useState<IState>(() => changeState(callbacks));
    const { input, onListSelect } = state;
    ref = useRef(null);

    useEffect(() => {
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    }, [input]);
    
    const { isFocus, value, valueHTML } = getState(input);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = valueHTML;
    }, [valueHTML]);
    
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
