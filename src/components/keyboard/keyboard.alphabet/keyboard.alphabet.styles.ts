import { makeStyles } from '@material-ui/core/styles';

export const useStylesAlphabet = makeStyles({
  keyboardAlphabet: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    flexGrow: 1,
    boxSizing: 'border-box',
    padding: '0.15em 0px',
  },
  spacer: {
    margin: '0.2em',
  },
  offset: {
    width: '30%',
  },
  space: {
    width: '320%',
  },
});
