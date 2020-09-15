import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/SetEnvironment';

type Props = {
    setEnvironment: (rect: DOMRect) => void;
} & WithStyles;

function SetEnvironment({ classes, setEnvironment }: Props) {
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useLayoutEffect(() => {
        const elem: HTMLDivElement = ref.current!;
        const rect: DOMRect = elem.getBoundingClientRect();
        setEnvironment(rect);
    }, [setEnvironment]);

    return (
        <div ref={ref} className={classes.wrapper}>
            APP START ...
        </div>
    );
}

export default withStyles(styles)(SetEnvironment);
