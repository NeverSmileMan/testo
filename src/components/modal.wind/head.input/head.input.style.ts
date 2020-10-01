import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyle = makeStyles((theme: Theme) => createStyles({
    input: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        height: '30px',
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between;',
        marginBottom: '15px',
    },
    inputHead: {
        backgroundColor: theme.palette.primary.main,
        height: '110px',
        padding: '0 10px',
        borderRadius: '10px 10px 0 0',
    },
    weigh: {
        color: '#000',
        fontSize: '30px',
        paddingLeft: '10px',
    },
    closeBtn: {
        color: '#fff',
        backgroundColor: '#0099FF',
        fontSize: '30px',
        border: 'none',
        outline: 'none',
    }
}))
