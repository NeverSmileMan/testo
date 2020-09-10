import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles ((theme: Theme) => createStyles({
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
    backLigth:{
        filter: 'brightness(150%)',
    }
}))
interface StyleProp {
    borderColor?: string;
    colorBtn?: string;
    textColor?: string;
}
interface Prop extends StyleProp {
    btnName?: string | any;
    nameClass?: string;
}
enum Cls {
    btn,
    btn0,
    backLigth
}

const WeightBtn = ({ btnName, borderColor = 'none', textColor='#000', colorBtn = '#e4e4e4', nameClass }: Prop) => {
    const cls:Record<string, string> = useStyles({ borderColor, colorBtn, textColor});
    const namedClass = nameClass && cls[nameClass]
        ? `${cls.btn} ${cls[nameClass]}` 
        : `${cls.btn}`
    return (
        <div className={namedClass}>{btnName}</div>
    )
}

export default WeightBtn;