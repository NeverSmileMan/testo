import React from 'react';
import KeyboardObject from '../data.structure/Keyboard';
import { makeStyles } from '@material-ui/styles';

function getSizeOfElements(layoutWidth: number) {
    const keyCount = 26;
    const rowCount = 3;
    const keyCountByRow = [8, 10, 8];
    const k1 = 0.7; // розрахункова (середня) відстань між кнопками (відносно ширини кнопки)
    const k2 = 0.2; // фактична відстань між кнопками (відносно ширини кнопки)
    const keyWidth = Math.ceil(layoutWidth * rowCount / keyCount / (1 + k1));
    const rowsWidth = keyCountByRow.map(count => keyWidth * (count * (1 + k2) - k2));
    const padding = k2 * keyWidth;

    return {
        layoutWidth: `${layoutWidth}px`,
        keyWidth: `${keyWidth}px`,
        rowsWidth: rowsWidth.map(width => `${width}px`),
        padding: `${padding}px`,
    };
}

const sizeOfElements = getSizeOfElements(700);

const useStyles = makeStyles({
    'layout': {
        width: sizeOfElements.layoutWidth,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: sizeOfElements.padding,
        paddingBottom: sizeOfElements.padding,
        alignItems: 'center',
        '& [class*=row]': {
            flexGrow: '1',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        '& .row-1': {
            width: sizeOfElements.rowsWidth[0],
        },
        '& .row-2': {
            width:  sizeOfElements.rowsWidth[1],
        },
        '& .row-3': {
            width:  sizeOfElements.rowsWidth[2],
        },
    },

	'key': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: '.15rem',
		fontSize: '1.1em',
		background:'#e4e4e4', 
		overflow: 'hidden',
		fontWeight: 400,
		height: sizeOfElements.keyWidth,
		width: sizeOfElements.keyWidth,
  },
});

const keyboard = KeyboardObject.getInstance();

function KeyboardLayoutEN() {
    const classes = useStyles();

    const keys = keyboard.getSet('EN')?.map(
        (key, i) => <div className={`${classes.key}`} key={i} data-key={key}>{key}</div>
    );

    if (!keys) return null;

    return (
        <div className={classes.layout}>
            <div className='row-1'>{keys.slice(0, 8)}</div>
            <div className='row-2'>{keys.slice(8, 18)}</div>
            <div className='row-3'>{keys.slice(18, 26)}</div>
        </div>
    );
}

export default KeyboardLayoutEN;
