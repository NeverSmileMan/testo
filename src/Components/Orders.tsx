import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';

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

function Orders({ classes }: WithStyles ) {
    return (
        <div className={classes.wrapper}>
            <div className='tabs-panel'>
                <TabsNav />
                <Message />
                <HomeButton />
            </div>
            <div className='order-panel'>
                <OrderControl />
                <Controls />
            </div>
        </div>
    );
}

export default withStyles(styles)(Orders);
