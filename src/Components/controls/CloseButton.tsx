import React, { useState, useEffect } from 'react';
import Close from '../../data.structure/Close';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/CheckCircle';
import { Theme } from '@material-ui/core';
import CloseModal from './CloseModal';

const useStyles = makeStyles((theme: Theme) => ({
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
            marginTop: '2px', // solid #fff'
        // },
    },
    'disabled': {
        backgroundColor: theme.palette.primary.light,
    },
}));

const close = Close.getInstance();
const modalService = ModalService.getInstance();

const onClick = () => {
    close.doClose();
}

function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
    close.on('stateChange', () =>
        setState(() => ({ mode: close.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON }))
    );
}

function showModal(mode: Mode) {
    if (mode === Mode.MODAL)
        modalService.showModal(<CloseModal />);
    else modalService.showModal(null);
}

function CloseButton() {
    const classes = useStyles();
    const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

    useEffect(() => changeState(setState), []);

    useEffect(() => showModal(mode), [mode]);

    const isActive = close.isActive();
    const className = classes.btn + ' ' + (isActive ? '' : classes.disabled);
    return (
        <div
            className={className}
            onClick={onClick}>
            <CloseIcon />
            <div>закрити</div>
        </div>
    );
}

export default CloseButton;
