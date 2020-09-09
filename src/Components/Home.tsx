import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'home': {
        width: '15%',
    },
});

function Home() {
    const classes = useStyle();
    const [, setState] = useState({});

    return (
        <div className={classes.home}>
            home
        </div>
    );
}

export default Home;
