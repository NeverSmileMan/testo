import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesButton = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '.15rem',
      fontSize: '1.1em',
      background: theme.palette.grey[300],
      overflow: 'hidden',
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: 'uppercase',
      width: '100%',
      marginLeft: '0.15em',
      marginRight: '0.15em',
      border: 'none',
      padding: '0',
    },
  }),
);
