import React from 'react';
import {makeStyles} from '@material-ui/styles';
import InputHead from './head.input';
import KeyboardInput from './keyboard.input';

const useStyle = makeStyles({
    'inputConteiner': {
        width: '44%',
        marginRight: '12px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
                color: '#fff',
                fontSize: '40px',
    },
});

const InputWeight = () => {
    const { inputConteiner } = useStyle();

    return (
        <div className={inputConteiner}>
            <InputHead />
            <KeyboardInput />
        </div>
    );
};

export default InputWeight;
