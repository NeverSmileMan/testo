import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Modal';
import ModalService from '../data.structure/ModalService';

const modalService = ModalService.getInstance();

let setState: React.Dispatch<{}>;
const changeState = () => {
    modalService.onShowModal(() => setState({}));
    return {};
}

function Modal({ classes }: WithStyles ) {
    [, setState] = useState(changeState);

    const content = modalService.getContent();
    return (content ? 
        <div className={classes.modal}>
            {content}
        </div> : null
    );
}

export default withStyles(styles)(Modal);
