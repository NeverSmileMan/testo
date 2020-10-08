import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  div: {
    // width: '20px',
    // height: '20px',
    width: (props: any) => props.width ?? '20px',
    height: (props: any) => props.height ?? '20px',
  },
});

const divs = Array(10).fill(1);

function App() {
  const [state, setState] = React.useState(true);
  const onClick = React.useCallback(() => {
    setState(!state);
  }, [state]);

  return (
    <div className='App'>
      <Button state={state} onClick={onClick} />
      {state ? divs.map((item) => <Div item={item} />) : null}
    </div>
  );
}

const Button = ({ state, onClick }: any) => {
  return <button onClick={onClick}>{state ? 'close' : 'show'}</button>;
};

const Div = ({ item }: any) => {
  const classes = useStyles();
  return <div className={classes.div}>{item}</div>;
};

export default App;