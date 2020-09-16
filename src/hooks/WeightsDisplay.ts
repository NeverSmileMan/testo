import React, { useState } from 'react'
import Weights, { IWeightsTest, IStateWeights } from '../data.structure/Weights';

const changeState = (weights: IWeightsTest, setState: React.Dispatch<() => IStateWeights>) => {
    weights.onChange(() => setState(weights.getStateWeights));
    return weights.getStateWeights();
};

const useWeights = () => {
    const weights = Weights.getInstance();
    const [state, setState] = useState(weights.getStateWeights);
    useState(() => changeState(weights, setState));
    return state;
};

export default useWeights;
