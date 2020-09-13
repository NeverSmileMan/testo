import React from 'react';
import { 
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import TaraDisplay from './TaraDisplay';
import KeyboardTara from './KeyboardTara';
import KeyboardTaraFix from './KeyboardTaraFix';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        width: '50%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        '& .display': {
            height: '30%',
            width: '50%',
        },
        '& .keyboardTara': {
            flex: '1 0 0',
        },
        '& .keyboardTaraFix': {
            width: '50%',
            height: '100%',
            marginLeft: '0.3rem',
        },
    },
}));

function TaraModal ({ classes }: WithStyles) {
    return (
        <div className={classes.wrapper}>
            <div className='display'>
                <TaraDisplay />
            </div>
            <div className='keyboardTara'>
                <KeyboardTara />
            </div>
            <div className='keyboardTaraFix'>
                <KeyboardTaraFix />
            </div>
        </div>
    );
};

export default withStyles(styles)(TaraModal);
