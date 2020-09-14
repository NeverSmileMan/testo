import { createStyles, Theme } from '@material-ui/core/styles';

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

export default styles;
