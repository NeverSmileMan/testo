import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        display: 'flex',
        padding: '0.5rem',
        paddingRight: '1rem',
        '& .letters': {
            width: '60%',
            marginRight: '2%',
        },
        '& .nums': {
            flex: '1 0 0',
            marginRight: '1.8%',
        },
        '& .func': {
            width: '15%',
        },
    },
}));

export default styles;
