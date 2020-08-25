import React, { useState } from 'react';
import './App.css';
import Test from './added.goods/test'; //--

const values = [
	{
		code: '1111',
		name: 'title1',
		amount: 11,
		cost: 111,
		isWeight: true,
	},
	{
		code: '2222',
		name: 'title2',
		amount: 22,
		cost: 222,
		isWeight: false,
	},
	{
		code: '3333',
		name: 'title3',
		amount: 33,
		cost: 333,
		isWeight: true,
	},
	{
		code: '4444',
		name: 'title4',
		amount: 44,
		cost: 444,
		isWeight: false,
	},
	{
		code: '5',
		name: 'title5',
		amount: 5,
		cost: 5,
		isWeight: false,
	},
	{
		code: '6',
		name: 'title6',
		amount: 6,
		cost: 6,
		isWeight: false,
	},
	{
		code: '7',
		name: 'title7',
		amount: 7,
		cost: 7,
		isWeight: false,
	},
	{
		code: '8',
		name: 'title8',
		amount: 8,
		cost: 8,
		isWeight: false,
	},
	{
		code: '9',
		name: 'title9',
		amount: 9,
		cost: 9,
		isWeight: false,
	},
	{
		code: '10',
		name: 'title10',
		amount: 10,
		cost: 10,
		isWeight: false,
	},
	{
		code: '11',
		name: 'title11',
		amount: 11,
		cost: 11,
		isWeight: false,
	},
	{
		code: '12',
		name: 'title12',
		amount: 12,
		cost: 12,
		isWeight: false,
	},
	{
		code: '13',
		name: 'title13',
		amount: 13,
		cost: 13,
		isWeight: false,
	},
	{
		code: '14',
		name: 'title14',
		amount: 14,
		cost: 14,
		isWeight: false,
	},
	{
		code: '15',
		name: 'title15',
		amount: 15,
		cost: 15,
		isWeight: false,
	},
	{
		code: '16',
		name: 'title16',
		amount: 16,
		cost: 16,
		isWeight: false,
	},
	{
		code: '17',
		name: 'title17',
		amount: 17,
		cost: 17,
		isWeight: false,
	},
];

const someValue = {
	code: '17',
	name: 'title17',
	amount: 17,
	cost: 17,
	isWeight: false,
};


const valSet = new Set(values);

export const ValuesContext = React.createContext({
	state: values,
	currentTargetId: -1,
	deleteActive: () => {},
	add: () => {},
	setActive: (id: number) => {},
	deleteSetVal: (val: any) => {},
	state2: valSet,
});







function App() {
	const [state, setState] = useState(values);
	const [currentTargetId, setCurrentTargetId] = useState(-1);
	
	//try with Set
	const [state2, setState2] = useState(valSet);

	return (
		<div className="App">
			<header className="App-header">
				<ValuesContext.Provider
					value={{
						state,
						currentTargetId,
						deleteActive: () => {
							setState(state.filter((item, index) => index !== +currentTargetId!));//или сплайс
							setCurrentTargetId(-1);
						},
						add: () => {
							let x = state;
							x.push(someValue);
							setState([...x]);
						},
						setActive: (id) => (currentTargetId === id ? setCurrentTargetId(-1) : setCurrentTargetId(id)),


						//try with Set
						state2,
						deleteSetVal: (val: any) => {
							let x = state2;
							console.log('state2', state2)
							x.delete(val);
							setState2(x);
							console.log('state2', state2);
						}
					}}
				>
					<Test />
				</ValuesContext.Provider>
			</header>
		</div>
	);
}

export default App;
