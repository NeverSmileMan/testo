import React, { useState, createContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Main';
import OrdersControl from '../data.structure/OrdersControl';
import WeightsDisplay from './weights/WeightsDisplay';
import Orders from './Orders';
import Keyboard from './keyboard/KeyboardMain';
import Weights, { IStateWeights } from '../data.structure/Weights';
import { weightsControl } from '../functions/rikAppTest';

export const WeightsContext = createContext<IStateWeights>({} as IStateWeights);

let setStateWeights: React.Dispatch<() => IStateWeights>;
let stateWeights: IStateWeights;
const changeStateWeights = () => {
    const weights = new Weights();
    weightsControl(weights);
    weights.onChange(() => setStateWeights(weights.getStateWeights));
    return weights.getStateWeights();
};

type Props = {
    maxOrdersCount: number;
} & WithStyles;

function Main({ classes, maxOrdersCount }: Props ) {
    const [ordersControl] = useState(new OrdersControl(maxOrdersCount));
    [stateWeights, setStateWeights] = useState(changeStateWeights);
    return (
        <div className={classes.test_wrapper}>
            <div className={classes.main}>
                <WeightsContext.Provider value={stateWeights}>
                    <div className='weights'>
                        <WeightsDisplay />
                    </div>
                    <div className='orders'>
                        <Orders object={ordersControl} />
                    </div>
                </WeightsContext.Provider>
                <div className='keyboard'>
                    <Keyboard />
                </div>
                <div id='modal-root'></div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Main);
