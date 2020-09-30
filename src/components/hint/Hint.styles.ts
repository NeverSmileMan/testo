import { makeStyles } from "@material-ui/styles";
export interface IError {
	color?:string,
	background?: string
}
export const useStyles = makeStyles( {
		hints: {
			width: '400px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '100%',
		},
		hints_messages: ( props: IError ) => ({
			width: '100%',
			height: '80%',
			borderRadius: '20px',
			fontSize: '14px',
			border: '1px solid #797979',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			color: props.color,
			background: props.background,
		}),
		// hints_error: ( props: IError ) => ({
		// 	color: props.color,
		// 	background: props.background,
		// }),
	}
)