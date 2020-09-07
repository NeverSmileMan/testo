import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Tabs from "./Tabs";
import Hints from "./Hints";
import HomeButton from "./HomeButton";


function App() {

	const styles = makeStyles({
		scale: {
			height: '15%',
			width: '100%',
		},
		scale2: {
			height: '100%',
			width: '100%',
			backgroundColor: 'gray'
		},
		app: {
			height: '85%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
		},
		header: {
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'row',
			alignItems: 'flex-end',
			height: '50px',
			outline: 'none'
		},
		main: {
			background: '#0099ff',
			flexGrow: 1,
			display: 'flex',
		},
		main_window: {
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			border: '1px solid',
			flexGrow: 1
		},
		group_buttons: {
			width: '150px',
			border: '1px solid',
		},
		serch_panel: {
			height: '50px',
			border: '1px solid',
		},
		keyboard: {
			height: '200px',

		}
	})
	const {scale, scale2, app, main, header, main_window, group_buttons, serch_panel, keyboard} = styles()

	return (
		<>
			<div className={scale}>
				<div className={scale2}>scale</div>
			</div>
			<div className={app}>
				<div className={header}>
					<Tabs />
					<Hints/>
					<HomeButton/>
				</div>
				<div className={main}>
					<div className={main_window}>
						<div className={serch_panel}>
							<div className="search_input"></div>
							<div className="total_price"></div>
						</div>
						<div className="list_order"></div>
					</div>
					<div className={group_buttons}></div>
				</div>
				<div className={keyboard}>keyboard component</div>
			</div>
		</>
	);
}

export default App;
