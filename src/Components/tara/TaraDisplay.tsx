import React, { useState, useEffect, useRef } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraDisplay';
import ActiveInputService from '../../data.structure/ActiveInputService';
import { InputNumber, IInputNumber, IStateInputNumber } from '../../data.structure/Input';

const activeInputService = ActiveInputService.getInstance();

let setState: React.Dispatch<() => IStateInputNumber>;
let state: IStateInputNumber;
let ref: React.RefObject<HTMLDivElement>;

const changeState = (input: IInputNumber, onSelect: Props['onSelect']) => {
    const getState = input.getStateInput;
    input.onFocusChange(() => setState(getState));
    input.onChange(() => setState(getState));
    input.onSelect(onSelect);
    return getState();
}

const attachInput = (input: IInputNumber) => {
    activeInputService.setActiveInput(input);
    return () => activeInputService.delActiveInput(input);
};

const refreshInput = (valueHTML: string) => {
    if (ref.current) ref.current.innerHTML = valueHTML;
};

type Props = {
    onSelect: (value: number) => void;
} & WithStyles;

function TaraDisplay({ classes, onSelect }: Props) {
    const [input] = useState(() => new InputNumber());
    [state, setState] = useState<IStateInputNumber>(() => changeState(input, onSelect));
    ref = useRef(null);

    const { isFocus, valueHTML } = state;

    useEffect(() => attachInput(input), [input]);
    useEffect(() => refreshInput(valueHTML), [valueHTML]);
    
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
