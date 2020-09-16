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
    valueHTML: string;
    value: string;
}

let setState: React.Dispatch<() => IState>;
let isFocus: boolean;
let valueHTML: string;
let value: string;
let ref: React.RefObject<HTMLDivElement>;
function changeState(input: IInputList, callbacks: Props['callbacks']) {
    const getValue = () => '&nbsp;' + input.getValue().replace(/ /g, '&nbsp;');
    const ifFocus = () => input.ifFocus();
    const getState = () => ({
        isFocus: ifFocus(),
        valueHTML: getValue(),
        value: input.getValue(),
    });
    input.onFocusChange(() => setState(getState));
    input.onChange(() => {
        if (ref.current) ref.current.innerHTML = valueHTML;
        setState(getState);
    });
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
    const onListSelect = useCallback(() => input._onSelect, [input]);
    [{ isFocus, valueHTML, value }, setState] = useState<IState>(() => changeState(input, callbacks));
    ref = useRef(null);

    useEffect(() => {
        if (ref.current) ref.current.innerHTML = valueHTML;
        activeInputService.setActiveInput(input);
        return () => activeInputService.delActiveInput(input);
    }, [input]);

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
