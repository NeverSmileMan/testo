import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesNumeric = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      background: (props: Record<string, string> ) => props.background ?? `${theme.palette.grey[400]}`,
      border: (props: Record<string, string> ) => props.border ?? 'none',
      color: (props: Record<string, string> ) => props.textColor ?? 'black',
      margin: '0',
    },
    keyboardNumeric: {
      display: 'grid',
      gridGap: '0.2em',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      height: '100%',
      boxSizing: 'border-box',
      padding: '0.15em 0em',
    },
    nkey_0: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_0 ?? '1',
      gridRow: (props: Record<string, string> ) => props.gridRow_0 ?? '1',
    },
    nkey_1: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_1 ?? '2',
      gridRow: (props: Record<string, string> ) => props.gridRow_1 ?? '1',
    },
    nkey_2: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_2 ?? '3',
      gridRow: (props: Record<string, string> ) => props.gridRow_2 ?? '1',
    },
    nkey_3: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_3 ?? '1',
      gridRow: (props: Record<string, string> ) => props.gridRow_3 ?? '2',
    },
    nkey_4: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_4 ?? '2',
      gridRow: (props: Record<string, string> ) => props.gridRow_4 ?? '2',
    },
    nkey_5: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_5 ?? '3',
      gridRow: (props: Record<string, string> ) => props.gridRow_5 ?? '2',
    },
    nkey_6: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_6 ?? '1',
      gridRow: (props: Record<string, string> ) => props.gridRow_6 ?? '3',
    },
    nkey_7: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_7 ?? '2',
      gridRow: (props: Record<string, string> ) => props.gridRow_7 ?? '3',
    },
    nkey_8: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_8 ?? '3',
      gridRow: (props: Record<string, string> ) => props.gridRow_8 ?? '3',
    },
    nkey_9: {
      gridColumn: (props: Record<string, string> ) => props.gridColumn_9 ?? '1 / 4',
      gridRow: (props: Record<string, string> ) => props.gridRow_9 ?? '4',
    },
  }),
);
