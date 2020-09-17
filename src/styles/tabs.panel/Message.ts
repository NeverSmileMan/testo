import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        padding: '0.5rem',
        '& .message': {
            color: theme.palette.secondary.dark,
            height: '100%',
            borderRadius: '.4rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            border: '1px solid ' + theme.palette.secondary.dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .error': {
            color: 'white',
            animation: '$error 2s infinite',
        },
    },
    '@keyframes error': {
        '0%': { background: 'white' },        
        '50%': { background: theme.palette.primary.main },
        '70%': { background: theme.palette.primary.main },
    },
}));

export default styles;
