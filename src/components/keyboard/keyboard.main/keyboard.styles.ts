import { makeStyles } from '@material-ui/core/styles';

export const useStylesKeyboard = makeStyles({
  keyboard: {
    padding: '0.2em',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '77fr 17fr 6fr',
    gridTemplateRows: '100%',
    gridGap: '0.3em',
    width: '100%',
    height: '100%',
  },
  alphabet: {
    gridColumn: '1',
    gridRow: '1',
  },
  numeric: {
    gridColumn: '2',
    gridRow: '1',
  },
  special: {
    gridColumn: '3',
    gridRow: '1',
  },
});
