import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '& .tabs-panel': {
            height: '14%',
            display: 'flex',
        },
        '& .order-panel': {
            flex: '1 0 0',
            display: 'flex',
        },
    },
}));

export default styles;
