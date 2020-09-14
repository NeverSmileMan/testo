import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'test_wrapper': {
        width: 1366 + 10 + 'px',
        height: 768 + 10 + 'px',
        background: 'grey',
        padding: '10px',
    },
    'main': {
        height: '100%',
        background: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '& .weights': {
            height: '16%',
        },
        '& .orders': {
            flex: '1 0 0',
        },
        '& .keyboard': {
            height: '25%',
        },
    },
}));

export default styles;
