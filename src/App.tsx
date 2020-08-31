import React, {  useRef, useEffect } from 'react';
import './App.css';
import Test from './added.goods/test'; //--
import { ActiveInputServise } from './services/ActiveInputServise';

//заменить регуляркой? или как это ваще пашет
const arr_symb = ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~', 'Alt', 'Control', 'Meta', 'Shift', 'Enter', 'Escape', 'Tab', 'CapsLock', 'Delete', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'Pause', 'ScrollLock', 'NumLock', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const set_symb = new Set(arr_symb);

function App() {
	const inputEl = useRef(null);  //как выставить фокус на этот див при создании

	const onKey = (e: React.KeyboardEvent) => {
		if (e.key === 'Backspace') {
			ActiveInputServise.delete(1);
		} else if (set_symb.has(e.key)) {
			e.preventDefault();
		} else {
			ActiveInputServise.add(e.key);
		}
	};

	// useEffect(() => {
	// 	if (inputEl.current !== null) { inputEl.current.focus()}
	// }, [])
	
	return (
		<div ref={inputEl} onKeyDown={onKey} tabIndex={-1} style={{height:'100%'}}>
			<Test />
		</div>
	);
}

export default App;

// export const Portal = ({ children, className = 'root-portal', el = 'div' }) => {
//   const [container] = React.useState(document.createElement(el))

//   container.classList.add(className)

//   React.useEffect(() => {
//     document.body.appendChild(container)
//     return () => {
//       document.body.removeChild(container)
//     }
//   }, [])

//   return ReactDOM.createPortal(children, container)
// }
