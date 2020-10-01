import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
    modal: {
        backgroundColor: '#fff',
        width: '550px',
        height: '300px',
        borderRadius: '10px',
        fontSize: '30px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        opacity: '1',
        margin: '0 auto',
        transform: 'translateY(50%)',
    },
    title: {
        padding: '40px',
        textAlign: 'center',
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btn: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px',
        width: '160px',
        border: '1px solid #000',
        borderRadius: '17px',
        fontSize: '30px',
    }
})