import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/CloseModal';
import Close from '../../data.structure/Close';

const close = Close.getInstance();

const onClickTrue = () => {
    close.doAction(true);
};

const onClickFalse = () => {
    close.doAction(false);
};

interface Props {
    title?: string;
    confirm?: string;
    reject?: string;
};

function CloseModal({
    title = 'Ви хочете остаточно закрити замовлення?',
    confirm = 'ТАК',
    reject = 'НІ',
    classes
}: Props & WithStyles) {
    return (
        <div className={classes.wrapper}>
            <div className='title'>
                {title}
            </div>
            <div className='controls'>
                <div className='btn' onClick={onClickTrue}>
                    {confirm}
                </div>
                <div className='btn' onClick={onClickFalse}>
                    {reject}
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(CloseModal);
