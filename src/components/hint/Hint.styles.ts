import { makeStyles } from "@material-ui/styles";

export const styles = makeStyles( {
		hints: {
			width: '400px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
		},
		hints_messages: {
			width: '100%',
			height: '80%',
			borderRadius: '20px',
			fontSize: '14px',
			border: '1px solid #797979',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		hints_error: {
			color: 'white',
			background: 'red',
		},
	}
)
