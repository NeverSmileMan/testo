import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/PrintModal';
import { IControlButton } from '../../data.structure/ControlButton';

interface Props {
    title?: string;
    confirm?: string;
    reject?: string;
    object: IControlButton,
};

function PrintModal({
    title = 'Роздрукувати замовлення?',
    confirm = 'ТАК',
    reject = 'НІ',
    classes,
    object,
}: Props & WithStyles) {
    const onClickTrue = useCallback(() => object.doAction(true), []);
    const onClickFalse = useCallback(() => object.doAction(false), []);
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

export default withStyles(styles)(PrintModal);
