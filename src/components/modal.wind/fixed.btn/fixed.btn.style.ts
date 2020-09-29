import { makeStyles } from '@material-ui/styles';

export const useStyle = makeStyles({
    btnContainer: {
        display: 'grid',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        gridTemplateColumns: 'repeat(3, 95px)',
        gridTemplateRows: 'repeat(3, 95px)',
        gridColumnGap: '15px',
        gridRowGap: '15px',
        padding: '15px',
    }
})