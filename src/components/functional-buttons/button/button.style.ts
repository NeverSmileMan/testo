import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    btn:  {
        height: '33.33%',
        borderRadius: '0 .4em .4em 0',
        color: '#fff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        border: 'none',
        '&:first-child': {
            borderBottom: '2px solid #fff',
        },
        '&:last-child ': {
            borderTop: '2px solid #fff'
        }
    },
}))