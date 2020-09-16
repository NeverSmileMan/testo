import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import ActiveInputService from '../../data.structure/ActiveInputService';
import { InputList, IInputList, IStateInputList } from '../../data.structure/Input';
import { IItem } from '../../data.structure/Item';
import List from './List';

const activeInputService = ActiveInputService.getInstance();

let setState: React.Dispatch<() => IStateInputList>;
let state: IStateInputList;
let ref: React.RefObject<HTMLDivElement>;

const changeState = (input: IInputList, callbacks: Props['callbacks']) => {
    const getState = input.getStateInput;
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    input.onSelect(callbacks.onSelect);
    callbacks.resetSearch(() => input.setValue(''));
    return getState();
};

const attachInput = (input: IInputList) => {
    activeInputService.setActiveInput(input);
    return () => activeInputService.delActiveInput(input);
};

const refreshInput = (valueHTML: string) => {
    if (ref.current) ref.current.innerHTML = valueHTML;
};

type Props = {
    callbacks: {
        onSelect: (item: IItem) => void;
        resetSearch: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {
    const [input] = useState(() => new InputList());
    const onListSelect = useCallback(input._onSelect, [input]);
    [state, setState] = useState<IStateInputList>(() => changeState(input, callbacks));
    ref = useRef(null);

    const { isFocus, value, valueHTML } = state;
    
    useEffect(() => attachInput(input), [input]);
    useEffect(() => refreshInput(valueHTML), [valueHTML]);

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
