import React from 'react';
import './App.css';
import Tabs from "./Tabs/Tabs";


const scaleStyle = {
	height: '15%',
	width: '100%',
}

const scaleSStyle = {
	height: '100%',
	width: '100%',
	backgroundColor: 'gray'
}


function App() {
	return (
		<>
			<div className="scale" style={scaleStyle}>
				<div className='scaleS' style={scaleSStyle}>scale</div>
			</div>
			<div className="ourApp">
				<Tabs/>
				<div className="main">main</div>
				<div className="keyboard">keyboard</div>
			</div>
		</>
	);
}

export default App;
