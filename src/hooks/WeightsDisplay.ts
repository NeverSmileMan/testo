import React, { useState } from 'react'
import Weights, { IWeightsTest, IStateWeightsTest } from '../data.structure/Weights'; 

const changeState = (
    weights: IWeightsTest,
    setState: React.Dispatch<() => IStateWeightsTest>
) => {
    weights.onChange(setState);
};

const useWeights = () => {
    const [weights] = useState(Weights.getInstance);
    const [state, setState] = useState(weights.getStateWeights);
    useState(() => changeState(weights, setState));
    return state;
};

export default useWeights;
