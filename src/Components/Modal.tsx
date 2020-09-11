import React, { useState, useEffect } from 'react';
import ModalService from '../data.structure/ModalService';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'modal': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '84.1%',
        width: '100%',
        zIndex: 9999,
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.5)',
        left: '0px',
        top: '15.9%',
    }
}));

const modalService = ModalService.getInstance();

function Modal({ classes }: WithStyles ) {
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

export default withStyles(styles)(Modal);
