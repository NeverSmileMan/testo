import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '& .search-panel': {
            height: '17%',
            display: 'flex',
        },
        '& .order-items': {
            flex: '1 0 0',
        },
    },
}));

export default styles;
