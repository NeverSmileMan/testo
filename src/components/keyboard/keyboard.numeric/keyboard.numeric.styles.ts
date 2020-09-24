import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesNumeric = makeStyles((theme: Theme) =>
  createStyles({
    btnNumeric: {
      background: `${theme.palette.grey[400]}`,
      margin: '0',
    },
    keyboardNumeric: {
      display: 'grid',
      gridGap: '0.2em',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      height: '100%',
      boxSizing: 'border-box',
    },
    nkey_0: {
      gridColumn: '1',
      gridRow: '1',
    },
    nkey_1: {
      gridColumn: '2',
      gridRow: '1',
    },
    nkey_2: {
      gridColumn: '3',
      gridRow: '1',
    },
    nkey_3: {
      gridColumn: '1',
      gridRow: '2',
    },
    nkey_4: {
      gridColumn: '2',
      gridRow: '2',
    },
    nkey_5: {
      gridColumn: '3',
      gridRow: '2',
    },
    nkey_6: {
      gridColumn: '1',
      gridRow: '3',
    },
    nkey_7: {
      gridColumn: '2',
      gridRow: '3',
    },
    nkey_8: {
      gridColumn: '3',
      gridRow: '3',
    },
    nkey_9: {
      gridColumn: '1 / 4',
      gridRow: '4',
    },
  }),
);
