import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import ModalService from '../data.structure/ModalService';

const styles = createStyles((theme: Theme) => ({
    'modal': {
        position: 'absolute',
        zIndex: 1000,
        top: '16%',
        width: '100%',           
        height: '84%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
}));

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
