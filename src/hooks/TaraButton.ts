import { useEffect, useState } from 'react';
import { ITaraButton } from '../data.structure/TaraButton';
import Weights from '../data.structure/Weights';

const changeState = (
    button: ITaraButton,
) => {
    const weights = Weights.getInstance();
    button.setWeights && button.setWeights(weights);
}

const useTaraButton = (button: ITaraButton) => {
    console.log('HOOK');
    useState(() => changeState(button));
    useEffect(() => {
        button.onWeightsChange();
    }, [button]);
    return button;
};

export default useTaraButton;
