import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

const useStyle = makeStyles({
    'home': {
        width: '12%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});

function Home() {
    const classes = useStyle();
    const [, setState] = useState({});

    return (
        <div className={classes.home}>
			<HomeIcon fontSize="small" />
        </div>
    );
}

export default Home;
