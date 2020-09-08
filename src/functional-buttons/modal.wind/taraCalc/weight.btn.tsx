import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    btn: ({ borderColor, colorBtn, textColor}: StyleProp) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorBtn,
        border: `2px solid ${borderColor}`,
        borderRadius: '10px',
        color: textColor,
        fontSize: '35px'
    }),
    btn0: {
        gridColumnStart: '1',
        gridColumnEnd: '3',
    },
})
interface StyleProp {
    borderColor?: string;
    colorBtn?: string;
    nameClass?: string;
    textColor?: string;
}
interface Prop extends StyleProp {
    btnName?: string | any;
}
const WeightBtn = ({ btnName, borderColor = 'none', textColor='#000', colorBtn = '#e4e4e4', nameClass }: Prop) => {
    const { btn, btn0 } = useStyles({ borderColor, colorBtn, textColor});
    const namedClass = nameClass === 'btn0' ? `${btn} ${btn0}` : `${btn}`
    return (
        <div className={namedClass}>{btnName}</div>
    )
}

export default WeightBtn;