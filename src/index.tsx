import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




// const appRoot = document.getElementById('root');
// const Hello =()=> (<div>Hello World</div>);
// const  Modal = (props: any)=> {
//     const modalRoot = document.getElementById('myEle');
//     return ReactDOM.createPortal(
//       props.children,
//       modalRoot!,
//     );
// }

// function App () {
//   const [state, setState] = useState(false);
 
//   return (
//     <div>
//         <div className="app">
//           <button onClick={()=> setState(!state)}>Show </button>
//          {state ? <Modal><Hello/></Modal> : null}
//         </div>
//       <div id="myEle">
//      </div>
//    </div>
//     );
// }

// ReactDOM.render(<App />, appRoot);
