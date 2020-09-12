import React from 'react';
import CloseObject from '../../data.structure/Close';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    modal: {
        backgroundColor: 'lightgrey',
        width: '40%',
        height: '300px',
        borderRadius: '10px',
        fontSize: '30px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        opacity: '1',
        margin: '0 auto',
    },
    title: {
        padding: '40px',
        textAlign: 'center',
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '90px',
        border: '1px solid #000',
        borderRadius: '8px',
    }
}));

const close = CloseObject.getInstance();

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
        <div className={classes.modal}>
            <div className={classes.title}>{title}</div>
            <div className={classes.btns}>
                <div className={classes.btn} onClick={onClickTrue}>{confirm}</div>
                <div className={classes.btn} onClick={onClickFalse}>{reject}</div>
            </div>
        </div>
    );
}

export default withStyles(styles)(CloseModal);
