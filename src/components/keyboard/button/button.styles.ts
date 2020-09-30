import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesButton = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '.15em',
      fontSize: '1.1em',
      overflow: 'hidden',
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'uppercase',
      width: '100%',
      marginLeft: '0.15em',
      marginRight: '0.15em',
      padding: '0',
      background: (props: Record<string, string>) =>
        props.background ?? `${theme.palette.grey[300]}`,
      border: (props: Record<string, string>) => props.border ?? 'none',
      color: (props: Record<string, string>) => props.textColor ?? 'black',
    },
  }),
);
