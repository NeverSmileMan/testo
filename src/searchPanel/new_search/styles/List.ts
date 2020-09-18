import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'list': {
        backgroundColor: theme.palette.primary.light,
        border: 'solid 3px ' + theme.palette.primary.main,
        borderTop: 'none',
        borderRight: 'none',
        position: 'absolute',
        top: '17%',
        left: '0px',
        width: 'calc(100% - 3px)',
        height: '83%',
        overflowY: 'auto',
        '& ul': {
            listStyle: 'none',
            margin: '0px',
            padding: '0px',
        },
        '& li': {
            fontSize: '1.1rem',
            borderBottom: 'solid 1px ' + theme.palette.secondary.dark,
            paddingLeft: '2rem',
            paddingRight: '2rem',
            backgroundColor: 'white',
            '&:first-child': {
                borderTop: 'solid 1px ' + theme.palette.secondary.dark,
            }
        },
        '& span': { 
            display: 'inline-block',
            '&:first-child': {
                width: '10%',
                marginRight: '2rem',
            },
            '&:nth-child(2)': {
                width: '55%',
            },
        },
        '& .not-found': {
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.palette.primary.main,
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
    },
}));

export default styles;
