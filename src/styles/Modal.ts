import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'modal': {
        position: 'absolute',
        zIndex: 1000,
        top: '16%',
        width: '100%',           
        height: '84%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
}));

export default styles;
