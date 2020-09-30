import { makeStyles } from '@material-ui/core/styles';

export const useStylesSpecial = makeStyles({
  keyboardSpecial: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '0.15em 0em',
  },
  keyboardSpecialGrid: {
    display: 'grid',
    gridGap: '0.4em',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
  },
  skey_0: {
    gridColumn: '1',
    gridRow: '1',
  },
  skey_1: {
    gridColumn: '1',
    gridRow: '2',
  },
  skey_2: {
    gridColumn: '1',
    gridRow: '3',
  },
  btnSpecial: {
    display: 'flex',
    margin: '0px',
  },
  clearBtn: {
    fontSize: '0.8em',
  },
});
