import { createStyles, Theme } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
        backgroundColor: theme.palette.secondary.light,
        border: 'solid 3px ' + theme.palette.primary.main,
        borderTop: 'none',
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
        '& .selected': {
            backgroundColor: theme.palette.secondary.dark,
            color: 'white',
        },
    },
}));

export default styles;
