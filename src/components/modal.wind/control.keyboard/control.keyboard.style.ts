import { makeStyles } from '@material-ui/styles';

export const useStyle = makeStyles({
    controlContainer: {
        display: 'grid',
        gridTemplateColumns: '50px',
        gridTemplateRows: 'repeat(2, 105px)',
        gridRowGap: '10px',
        padding: '5px',
        fontSize: '50px',
    }
})