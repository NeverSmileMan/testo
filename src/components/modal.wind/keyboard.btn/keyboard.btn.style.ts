import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyleProp } from './keyboard.btn.interface';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    btn: ({ borderColor, colorBtn, textColor }: StyleProp) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorBtn,
        border: borderColor ? `2px solid ${borderColor}`: 'none',
        borderRadius: '10px',
        color: textColor,
        fontSize: '30px',
        outline: 'none',
    }),
    btn0: {
        gridColumnStart: '1',
        gridColumnEnd: '3',
    },
    backLigth: {
        filter: 'brightness(150%)',
    }
}))
