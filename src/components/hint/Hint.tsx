import React, { FC, useEffect, useState } from 'react';
import { IError, useStyles } from "./Hint.styles";
import { useHints } from './hint.provider';


export const Hint: FC = () => {


	let props: IError | null = null;
	const classes: Record<string, string> = useStyles( props );
	const { hint, error } = useHints();
	const [ classError, setClassError ] = useState<string>();

	let timeout: NodeJS.Timeout
	useEffect( () => {
		if ( error ) {
			props = { background: 'red', color: 'white' }
			setClassError( `${ classes.hints_messages } ${ classes.hints_error }` )
			timeout = setTimeout( () => { setClassError( classes.hints_messages ) }, 300 )
		} else {
			setClassError( classes.hints_messages )
			props = null
		}
		return () => clearTimeout( timeout )
	}, [ error ] )

	return (
		<div className={ classes.hints }>
			<div className={ classError }>{ hint }</div>
		</div>
	);
};