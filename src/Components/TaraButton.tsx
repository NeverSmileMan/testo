import React, { useState, useEffect } from 'react';
import Tara from '../data.structure/Tara';
import { Mode, State } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
//import TaraModal from './TaraModal';
import { makeStyles } from '@material-ui/styles';
import TaraIcon from '@material-ui/icons/Speed';
import TaraModal from './tara/modal.tara';
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
            marginBottom: '2px', // solid #fff',
        // },
        // '&:last-child ': {
        //     borderTop:'2px solid #fff'
        // },
    },
    'disabled': {
        backgrounColor: theme.palette.primary.light,
    },
}));

const tara = Tara.getInstance();
const modalService = ModalService.getInstance();

const onClick = () => {
    tara.doTara();
}

function changeState(setState: React.Dispatch<() => { mode: Mode}>) {
    tara.on('stateChange', () =>
        setState(() => ({ mode: tara.getState() === State.PENDING ? Mode.MODAL : Mode.BUTTON }))
    );
}

function showModal(mode: Mode) {
    if (mode === Mode.MODAL)
        modalService.showModal(<TaraModal />);
    else modalService.showModal(null);
}

function TaraButton() {
    const classes = useStyles();
    const [{ mode }, setState] = useState({ mode: Mode.BUTTON });

    useEffect(() => changeState(setState), []);

    useEffect(() => showModal(mode), [mode]);

    const isActive = tara.isActive(); 
    const className = classes.btn + ' ' + (isActive ? '' : classes.disabled);
    return (
        <div
            className={className}
            onClick={onClick}>
            <TaraIcon />
            <div>тара</div>
        </div>
    );
}

export default TaraButton;

// return (
//     <div
//         className={`tara btn ${isActive ? '' : 'disabled'}`}
//         onClick={onClick}>
//         <div className='title'>TARA</div>
//     </div>
// );
