import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Orders';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './order.control/OrderControl';
import Controls from './controls/Controls';

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
