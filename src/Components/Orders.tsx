import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import TabsNav from './tabs.panel/TabsNav';
import Message from './tabs.panel/Message';
import HomeButton from './tabs.panel/HomeButton';
import OrderControl from './orders/OrderControl';
import Controls from './controls/Controls';

const styles = createStyles((theme: Theme) => ({
    'orders': {
        '& .tabs-panel': {
            height: '14%',
            display: 'flex',
        },
        '& .order-panel': {
            height: '86%',
            display: 'flex',
        },
    },
}));

interface Props {
    containerClassName: string;
}

function Orders({ containerClassName, classes }: Props & WithStyles ) {

    const className = `${containerClassName} ${classes.orders}`;
    return (
        <div className={className}>
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
