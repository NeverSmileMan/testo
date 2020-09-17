import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        borderRadius: '0 .4rem .4rem 0',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        cursor: 'pointer',
        '&:first-child': {
            marginBottom: '2px',
        },
        '&:last-child ': {
            marginTop: '2px',
        },
    },
    'disabled': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export default styles;
