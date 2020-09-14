import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/SetEnvironment';
import App from '../data.structure/App';

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
