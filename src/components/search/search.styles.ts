import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  wrapper: {
    backgroundColor: theme.palette.primary.main,
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 1.5rem',
    '& .input': {
      flex: '1 0 0',
      padding: '0 1.5rem',
      backgroundColor: 'white',
      borderRadius: '100px',
      fontSize: '1rem',
      fontWeight: 'bold',
      overflow: 'hidden',
      whiteSpace: 'break-spaces',
    },
    '& .input:after': {
        content: "''",
        paddingLeft: props => props ? '3px' : '0px',
        animation: '$cursor 1s infinite',
        background: theme.palette.secondary.dark,
        opacity: 0,
    },
  },
  '@keyframes cursor': {
    '0%': { opacity: 0 },
    '40%': { opacity: 1 },
    '100%': { opacity: 0 },
  },
}));
