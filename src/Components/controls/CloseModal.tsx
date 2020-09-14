import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/CloseModal';
import { IClose } from '../../data.structure/Close';

interface Props {
    title?: string;
    confirm?: string;
    reject?: string;
    object: IClose;
};

function CloseModal({
    title = 'Ви хочете остаточно закрити замовлення?',
    confirm = 'ТАК',
    reject = 'НІ',
    classes,
    object,
}: Props & WithStyles) {
    const onClickTrue = useCallback(() => object.doAction(true), []);
    const onClickFalse = useCallback(() => object.doAction(true), []);
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
