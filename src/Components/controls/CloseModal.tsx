import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/CloseModal';
import { IControlButton } from '../../data.structure/ControlButton';

interface Props {
    title?: string;
    confirm?: string;
    reject?: string;
    button: IControlButton;
};

function CloseModal({
    title = 'Ви хочете остаточно закрити замовлення?',
    confirm = 'ТАК',
    reject = 'НІ',
    classes,
    button,
}: Props & WithStyles) {
    const onClickTrue = useCallback(() => button.doAction(true), [button]);
    const onClickFalse = useCallback(() => button.doAction(false), [button]);
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
