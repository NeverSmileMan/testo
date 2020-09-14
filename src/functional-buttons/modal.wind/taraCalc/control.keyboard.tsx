import React from 'react';
import WeightBtn from './weight.btn';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useStyle = makeStyles({
    controlContainer: {
        display: 'grid',
        gridTemplateColumns: '50px',
        gridTemplateRows: 'repeat(2, 105px)',
        gridRowGap: '10px',
        padding: '5px',
        fontSize: '50px',
    }
})
interface Prop {
    onClick?: ()=> any;
}
const ControlKeyboard = ({onClick}:Prop) => {
    const theme = useTheme<Theme>();
    const control = [<span>&#8592;</span>, <span>&#10003;</span>];
    const { controlContainer } = useStyle()
    return (
        <div className={controlContainer}>
            {control.map((val, index) => {
                if (index===control.length-1) {
                    return (<WeightBtn
                        key={index}
                        btnName={val}
                        textColor='#fff'
                        colorBtn={theme.palette.primary.main}
                        nameClass={'backLigth'} />)
                }
                return (<WeightBtn
                onClick={()=>onClick}
                key={index}
                btnName={val}
                textColor='#fff'
                colorBtn={theme.palette.primary.main} />)})}
        </div>
    )
}

export default ControlKeyboard;