import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        padding: '0.5rem',
        '& .message': {
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
            animation: '$error 1200ms infinite',
        },
    },
    '@keyframes error': {
        '0%': { background: 'white' },        
        '10%': { background: theme.palette.primary.main },
    },
}));

export default styles;
