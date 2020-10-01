import React, { FC, useEffect, useCallback } from 'react';
import { ActiveInputService } from '../services/ActiveInputService';
import { useStyles } from './on.key.down.handler.styles';

const arr_symb = ['!','@','#','$','*','(',')','_','`','^',';',':','[',']','{','}','<','>','\\','|','/',',','.',"'",'"','ContextMenu','№','%','&','?','-','+','=','~','Alt','Control','Meta','Shift','Enter','Escape','Tab','CapsLock','Delete','Insert','Home','End','PageUp','PageDown','Pause','ScrollLock','NumLock','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const set_symb = new Set(arr_symb);

const OnKeyDownHandler: FC<{}> = ({ children }) => {
	const classes = useStyles();
	const inputRef = React.useRef<any>();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const onBlur = useCallback(() => {
		inputRef.current.focus();
	}, []);

	const onKey = useCallback((e: React.KeyboardEvent) => {
		if (e.key === 'Backspace') {
			ActiveInputService.delete('1');
		} else if (set_symb.has(e.key)) {
			e.preventDefault();
		} else {
			ActiveInputService.add(e.key);
		}
	}, []);

	return (
		<div ref={inputRef} onBlur={onBlur} className={classes.appWrap} onKeyDown={onKey} tabIndex={-1}>
			{children}
		</div>
	);
};

export default OnKeyDownHandler;
