import React, { useState, useEffect } from 'react';
import Close from '../data.structure/Close';
import { Mode, State } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import CloseModal from './CloseModal';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
    btn: {
        height: '33.33%',
        borderRadius: '0 .4em .4em 0',
        color: '#fff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgb(0, 153, 255)',
        // '&:first-child': {
        //     borderBottom: '2px solid #fff',
        // },
        // '&:last-child ': {
            borderTop:'2px solid #fff'
        // },
    },
});

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

    return (
        <div
            className={classes.btn}
            onClick={onClick}>
            <CloseIcon />
            <div>тара</div>
        </div>
    );
}

export default CloseButton;
