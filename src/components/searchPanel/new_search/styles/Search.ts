import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        backgroundColor: theme.palette.primary.main,
        width: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 1.5rem',
        '& .input': {
            flex: '1 0 0',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
        },
        '& .focus:after': {
            content: "''",
            paddingLeft: '3px',
            animation: '$cursor 1s infinite',
            background: theme.palette.secondary.dark,
            opacity: 0,
        },
    },
    '@keyframes cursor': {
        '0%': {opacity: 0},
        '40%': {opacity: 1},
        '100%': {opacity: 0},
    },
}));

export default styles;
