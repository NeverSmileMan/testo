import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '0 0 0.5rem 0.5rem',
        display: 'flex',
        padding: '0.5rem',
        '& .nums': {
            width: '80%',
        },
        '& .func': {
            flex: '1 0 0',
        },
    },
}));

export default styles;
