import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { StyleProp } from './keyboard.btn.interface';

export const useStyles = makeStyles((theme: Theme) => createStyles({
    btn: ({ borderColor, colorBtn, textColor }: StyleProp) => ({
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
    backLigth: {
        filter: 'brightness(150%)',
    }
}))
