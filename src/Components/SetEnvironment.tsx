import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import App from '../data.structure/App';

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

const app = App.getInstance();

function SetEnvironment({ classes }: WithStyles) {
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useLayoutEffect(() => {
        const elem: HTMLDivElement = ref.current!;
        const rect: DOMRect = elem.getBoundingClientRect();
        app.setEnvironment(rect);
    }, []);

    return (
        <div ref={ref} className={classes.wrapper}>
            APP START ...
        </div>
    );
}

export default withStyles(styles)(SetEnvironment);
