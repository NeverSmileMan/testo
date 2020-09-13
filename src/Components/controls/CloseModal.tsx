import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import Close from '../../data.structure/Close';

const styles = createStyles((theme: Theme) => ({
    wrapper: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.dark,
        width: '40%',
        height: '50%',
        borderRadius: '1.5rem',
        fontSize: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        '& .title': {
            padding: '10%',
            textAlign: 'center',
        },
        '& .controls': {
            display: 'flex',
            justifyContent: 'space-evenly',
        },
        '& .btn': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '3.5rem',
            width: '4.5rem',
            border: '1px solid black',
            borderRadius: '0.5rem',
        },
    },
}));

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
