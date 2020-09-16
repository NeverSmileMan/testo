import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import ActiveInputService from '../../data.structure/ActiveInputService';
import { InputList, IInputList } from '../../data.structure/Input';
import { IItem } from '../../data.structure/Item';
import List from './List';

const activeInputService = ActiveInputService.getInstance();

interface IState {
    isFocus: boolean;
    value: string;
    valueHTML: string;
}


let setState: React.Dispatch<() => IState>;
let state: IState;
let ref: React.RefObject<HTMLDivElement>;
function changeState(input: IInputList, callbacks: Props['callbacks']) {
    const getState = () => ({
        isFocus: input.ifFocus(),
        value: input.getValue(),
        valueHTML: input.getValueHTML(),
    });
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    input.onSelect(callbacks.onSelect);
    callbacks.resetSearch(() => input.setValue(''));
    return getState();
}

type Props = {
    callbacks: {
        onSelect: (item: IItem) => void;
        resetSearch: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {
    const [input] = useState(() => new InputList());
    const onListSelect = useCallback((item: IItem) => input._onSelect(item), [input]);
    [state, setState] = useState<IState>(() => changeState(input, callbacks));
    ref = useRef(null);

    useEffect(() => {
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    }, [input]);
    
    const { isFocus, value, valueHTML } = state;

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
