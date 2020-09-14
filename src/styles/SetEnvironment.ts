import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1366 + 10 + 'px',
        height: 768 + 10 + 'px',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '5rem',
    },
}));

export default styles;
