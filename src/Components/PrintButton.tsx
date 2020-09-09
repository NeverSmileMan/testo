import React, { useState, useEffect } from 'react';
import Print from '../data.structure/Print';
import { Mode, State } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import PrintModal from './PrintModal';
import { makeStyles } from '@material-ui/styles';
import PrintIcon from '@material-ui/icons/Print';
import { Theme } from '@material-ui/core';

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
        //     borderTop:'2px solid #fff'
        // },
    },
}));

const print = Print.getInstance();
const modalService = ModalService.getInstance();

const onClick = () => {
    print.doPrint();
}

function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
    print.on('stateChange', () =>
        setState(() => ({ mode: print.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON }))
    );
}

function showModal(mode: Mode) {
    if (mode === Mode.MODAL)
        modalService.showModal(<PrintModal />);
    else modalService.showModal(null);
}

function PrintButton() {
    const classes = useStyles();
    const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

    useEffect(() => changeState(setState), []);

    useEffect(() => showModal(mode), [mode]);

    const isActive = print.isActive();

    return (
        <div
            className={classes.btn}
            onClick={onClick}>
            <PrintIcon />
            <div>тара</div>
        </div>
    );
}

export default PrintButton;
