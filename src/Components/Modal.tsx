import React, { useState, useEffect } from 'react';
import ModalService from '../data.structure/ModalService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    'modal': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        zIndex: 9999,
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.5)',
        left: '0px',
        top: '0px',
    }
});

const modalService = ModalService.getInstance();

function Modal(): React.ReactElement | null {
    const classes = useStyles();
    const [, setState] = useState({});
    
    useEffect(() => {
        modalService.onShowModal(() => {
            setState({});
        });
    }, []);

    const content = modalService.getContent();
    return (content ? 
        <div className={classes.modal}>
            {content}
        </div> : null
    );
}

export default Modal;
