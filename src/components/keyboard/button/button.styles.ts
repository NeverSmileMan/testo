import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '.15em',
      overflow: 'hidden',
      fontWeight: theme.typography.fontWeightMedium,
      padding: '0',
      margin: (props: Record<string, string>) => props.margin ?? '0 0.15em 0 0.15em',
      textTransform: (props: Record<string, any>) => props.textTransform ?? 'none',
      width: (props: Record<string, string>) => props.width ?? '100%',
      fontSize: (props: Record<string, string>) => props.fontSize ?? '1.1em',
      background: (props: Record<string, string>) => props.colorBtn ?? `${theme.palette.grey[300]}`,
      border: (props: Record<string, string>) =>
        props.border ? `1px solid ${props.border}` : 'none',
      color: (props: Record<string, string>) => props.textColor ?? 'black',
      filter: (props: Record<string, string>) => props.filter ?? 'none',
    },
  }),
);
