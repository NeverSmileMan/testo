import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesTable = makeStyles((theme: Theme) =>
  createStyles({
    bodyContainer: {
      textAlign: 'start',
      height: '83%',
      overflowY: 'auto',
      padding: '0px',
      margin: '0px',
      display: 'flex',
      fontSize: '24px',
      flexDirection: 'column',
      flexGrow: 1,
      backgroundColor: theme.palette.grey[500],
    },
  }),
);
