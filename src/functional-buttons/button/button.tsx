import React, { JSXElementConstructor } from 'react';
import { makeStyles } from '@material-ui/styles';
import {createStyles, Theme} from "@material-ui/core/styles";

interface ButtonProp {
    nameButton: string;
    buttonIcon: () => any;
    click :() => any;
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
}
const useStyles = makeStyles((theme: Theme) => createStyles({
    btn: (prop: ButtonProp) => ({
        height: '33.33%',
        borderRadius: '0 .4em .4em 0',
        color: '#fff',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.main,
        '&:first-child': {
            borderBottom: '2px solid #fff',
        },
        '&:last-child ': {
            borderTop:'2px solid #fff'
        }
    }),
}))
const Button = (prop: ButtonProp) => {
    const classes = useStyles(prop);
    return (
        <div onClick={prop.click} className={classes.btn}>
            {prop.buttonIcon()}
            <div>{prop.nameButton}</div>
        </div>
    )
}

export default Button;