import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .delete': {
            width: '1.6rem',
            height: '1.6rem',
            borderRadius: '100px',
            background: 'white',
            color: theme.palette.error.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        },
        '& .total': {
            textAlign: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',     
            backgroundColor: 'white',
            borderRadius: '100px',
            color: theme.palette.primary.main,
            minWidth: '100px',
            fontWeight: 'bold',
            fontSize: '1rem',
        }
    },
}));

export default styles;
