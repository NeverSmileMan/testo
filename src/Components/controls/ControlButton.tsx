import React, { useState, useEffect } from 'react';
import Print from '../../data.structure/Print';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import PrintModal from './PrintModal';
import { StyledComponentProps, makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import { Theme } from '@material-ui/core';

const styles = createStyles((theme: Theme) => ({
    btn: {
        //height: '33.33%',
        flex: '1 0 0',
        borderRadius: '0 .4em .4em 0',
        color: '#fff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        // '&:first-child': {
        //     borderBottom: '2px solid #fff',
        // },
        // '&:last-child ': {
        //     borderTop:'2px solid #fff'
        // },
    },
    'disabled': {
        backgroundColor: theme.palette.primary.light,
    },
}));

const modalService = ModalService.getInstance();

export type IControlButtonProps = {
    object: any;
    onClickMethodName: string;
    modal: React.FunctionComponent<any>;
    icon: React.FunctionComponent<any>;
    text: string;
} & StyledComponentProps<any>;

function createControlButton(props: IControlButtonProps) {
    const onClick = () => {
        props.object[props.onClickMethodName]();
    }

    function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
        props.object.on('stateChange', () =>
            setState(() => ({ mode: props.object.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON }))
        );
    }

    function showModal(mode: Mode) {
        if (mode === Mode.MODAL)
            modalService.showModal(<PrintModal />);
        else modalService.showModal(null);
    }

    function ControlButton() {
        const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

        useEffect(() => changeState(setState), []);

        useEffect(() => showModal(mode), [mode]);

        const isActive = props.object.isActive();
        const className = props.classes?.btn + ' ' + (isActive ? '' : props.classes?.disabled);
console.log(props);
        return (
            <div
                className={className}
                onClick={onClick}>
                <props.icon />
                <div>{props.text}</div>
            </div>
        );
    }

    return ControlButton;
}

const ControlButtonStyled = withStyles(styles)(createControlButton as any);

export default createControlButton;
