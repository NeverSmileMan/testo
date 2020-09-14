import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        padding: '0.5rem',
        '& .message': {
            height: '100%',
            borderRadius: '.4rem',
            fontSize: '0.8rem',
            border: '1px solid ' + theme.palette.secondary.dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .error': {
            color: 'white',
            background: theme.palette.primary.main,
            animation: '$error 300ms',
        },
    },
    '@keyframes error': {
        '0%': {opacity: 0},
        '25%': {opacity: 1},
        '50%': {opacity: 0},
        '75%': {opacity: 1},
        '100%': {opacity: 0},
    },
}));

export default styles;
