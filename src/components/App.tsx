import React, {createContext, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Tabs from "./header/Tabs";
import Hints from "./header/Hints";
import HomeButton from "./header/HomeButton";
import {ITab} from "./header/Tab";
import Keyboard from "./keyboard/Keyboard";
import Search from './search/Search';

export const DataContext = createContext({})


function App() {

	const [tabs, setTabs] = useState([{active: true, tabNumber: 1, tara: 0} as ITab])

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
			flexGrow: 1
		},
		group_buttons: {
			width: '150px',
			border: '1px solid',
		},
		search_panel: {
			height: '50px',
			border: '1px solid',
			borderTop: 'none'
		},
		keyboard: {
			height: '200px',

		}
	})
	const {scale, scale2, app, main, header, main_window, group_buttons, search_panel, keyboard} = styles()
	return (
		<>
			<div className={scale}>
				<div className={scale2}>scale</div>
			</div>
			<DataContext.Provider value={tabs}>
				<div className={app}>
					<div className={header}>
						<Tabs/>
						<Hints/>
						<HomeButton/>
					</div>
					<div className={main}>
						<div className={main_window}>
							<div className={search_panel}>
								<Search />
								<div className="total_price"></div>
							</div>
							<div className="list_order"></div>
						</div>
						<div className={group_buttons}></div>
					</div>
					<div className={keyboard}>
						<Keyboard />
					</div>
				</div>
			</DataContext.Provider>
		</>
	);
}

export default App;
