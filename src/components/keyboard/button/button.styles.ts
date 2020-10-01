import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStylesButton = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '.15em',
      fontSize: (props: Record<string, string>) => props.fontSize ?? '1.1em',
      overflow: 'hidden',
      fontWeight: theme.typography.fontWeightMedium,
      textTransform: (props: Record<string, string>) => props.textTransform ? 'lowercase' : 'uppercase',
      width: '100%',
      marginLeft: '0.15em',
      marginRight: '0.15em',
      padding: '0',
      background: (props: Record<string, string>) =>
        props.colorBtn ?? `${theme.palette.grey[300]}`,
      border: (props: Record<string, string>) => props.border ? `1px solid ${props.border}` : 'none',
      color: (props: Record<string, string>) => props.textColor ?? 'black',
      filter: (props:Record<string, string>) => props.filter ?? 'none'
    },
  }),
);
