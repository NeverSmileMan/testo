import { makeStyles } from '@material-ui/styles';

export const useStyle = makeStyles({
    numberKeyboard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 70px)',
        gridTemplateRows: 'repeat(4, 51px)',
        gridGap: '5px',
        padding: '5px',

    },
    btn0: {
        gridColumnStart: '1',
        gridColumnEnd: '3'
    }
})