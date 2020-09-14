import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/PrintModal';
import Print from '../../data.structure/Print';

const print = Print.getInstance();

const onClickTrue = () => {
    print.doAction(true);
};

const onClickFalse = () => {
    print.doAction(false);
};

interface Props {
    title?: string;
    confirm?: string;
    reject?: string;
};

function PrintModal({
    title = 'Роздрукувати замовлення?',
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

export default withStyles(styles)(PrintModal);
