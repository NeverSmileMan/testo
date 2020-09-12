import React, { useState, useEffect } from 'react';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { StyledComponentProps } from '@material-ui/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        borderRadius: '0 .4rem .4rem 0',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
        doAction: Function;
        onChange: Function;
        isActive: Function;
        getState: Function;
    },
    ModalComponent: React.ComponentType<any> & StyledComponentProps;
    IconComponent: React.FunctionComponent<any>;
    text: string;
}

function createControlButton(props: IControlButtonProps) {
    const { object, ModalComponent, IconComponent, text } = props;

    const onClick = () => {
        object.doAction();
    }

    function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
        object.onChange(() =>
            setState(() => ({ mode: object.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON }))
        );
    }

    function showModal(mode: Mode) {
        if (mode === Mode.MODAL)
            modalService.showModal(<ModalComponent />);
        else modalService.showModal(null);
    }

    function ControlButton({ classes }: WithStyles) {
        const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

        useEffect(() => changeState(setState), []);

        useEffect(() => showModal(mode), [mode]);

        const isActive = object.isActive();
        const className = `${classes.wrapper} ${isActive ? '' : classes.disabled}`;

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
