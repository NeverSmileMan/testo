import React, { useState, useCallback, useEffect } from 'react';
import { ActiveInputServise } from '../services/ActiveInputServise';

const divStyle = {//----херня
	height: '25px',
	width: '200px',
	backgroundColor: 'red',
	display: 'inline-block',
	border: '1px solid green',
	margin: '5px',
};

export default function SearchInput() {
	const [state, setState] = useState('');

	const onClick = useCallback(() => ActiveInputServise.setActive(setState), []);

	useEffect(() => {
    ActiveInputServise.setActive(setState); //прописка в активный
		return () => {
			ActiveInputServise.unsetActive(setState);
		};
	}, []);

	return (
		<div style={divStyle} onClick={onClick}>
			{state}
		</div>
	);
}
