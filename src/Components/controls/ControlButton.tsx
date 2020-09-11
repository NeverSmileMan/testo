import React, { useState, useEffect } from 'react';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import { StyledComponentProps, createStyles, withStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    btn: {
        flex: '1 0 0',
        borderRadius: '0 .4em .4em 0',
        color: '#fff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        '&:first-child': {
            marginBottom: '2px',
        },
        '&:last-child ': {
            marginTop: '2px',
        },
    },
    'disabled': {
        backgroundColor: theme.palette.primary.light,
    },
}));

const modalService = ModalService.getInstance();

export interface IControlButtonProps {
    object: {
        do: Function;
        on: Function;
        isActive: Function;
        getState: Function;
    },
    ModalComponent: React.FunctionComponent<any>;
    IconComponent: React.FunctionComponent<any>;
    text: string;
}

function createControlButton(props: IControlButtonProps) {
    const { object, ModalComponent, IconComponent, text } = props;

    const onClick = () => {
        object.do();
    }

    function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
        object.on('stateChange', () =>
            setState(() => ({ mode: object.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON }))
        );
    }

    function showModal(mode: Mode) {
        if (mode === Mode.MODAL)
            modalService.showModal(<ModalComponent />);
        else modalService.showModal(null);
    }

    function ControlButton(props: StyledComponentProps) {
        const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

        useEffect(() => changeState(setState), []);

        useEffect(() => showModal(mode), [mode]);

        const isActive = object.isActive();
        const className = props.classes?.btn + ' ' + (isActive ? '' : props.classes?.disabled);

        return (
            <div
                className={className}
                onClick={onClick}>
                <IconComponent />
                <div>{text}</div>
            </div>
        );
    }

    return withStyles(styles)(ControlButton);
}

export default createControlButton;
