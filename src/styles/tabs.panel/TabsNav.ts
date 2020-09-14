import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        width: '55%',
        paddingTop: '.4rem',
        display: 'flex',
        '& .tab': {
            marginRight: '.2rem',
            width: '15%',
            borderRadius: '.3rem .3rem 0 0',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.dark,
            cursor: 'pointer',
        },
        '& .active': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        },
    },
}));

export default styles;
