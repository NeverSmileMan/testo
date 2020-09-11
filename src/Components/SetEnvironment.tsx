import React from 'react';
import App from '../data.structure/App';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'app-init': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
        // width: '100vw',
        width: 1366 + 10 + 'px',
        height: 768 + 10 + 'px',
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.5)',
        left: '0',
        top: '0',
        color: 'white',
        fontSize: '5rem',
        fontFamily: 'Roboto',
    }
}));

const app = App.getInstance();

function SetEnvironment({ classes }: WithStyles): React.ReactElement {
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useLayoutEffect(
        () => {
            const elem: HTMLDivElement = ref.current!;
            const rect: DOMRect = elem.getBoundingClientRect();
            app.setEnvironment(rect);
    }, []);

    return (
        <div ref={ref} className={classes['app-init']}>
            APP START ...
        </div>
    );
}

export default withStyles(styles)(SetEnvironment);
