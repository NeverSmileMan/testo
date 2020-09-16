import React, { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {MainContext} from '../../../main';
const useStyle = makeStyles((theme: Theme) => createStyles({
    input: {
        backgroundColor: '#fff',
        borderRadius: '15px',
        height: '30px',
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between;',
        marginBottom: '15px',
    },
    inputHead: {
        backgroundColor: theme.palette.primary.main,
        height: '110px',
        padding: '0 10px',
        borderRadius: '10px 10px 0 0',
    },
    weigh: {
        color: '#000',
        fontSize: '30px',
        paddingLeft: '10px',
    },
}))

interface Prop {
    inputValue: string | number;
    inputName: string;
}

const HeadInput = ({inputName, inputValue}:Prop) => {
    const { inputHead, head, input, weigh } = useStyle();
  const { setType } = useContext(MainContext);

    return (
        <div className={inputHead}>
            <div className={head}>
                <div>{inputName}</div>
                <div
                    onClick={setType(null)}>
                    &#10005;
          </div>
            </div>
            <div className={input}>
                <div className={weigh}>{inputValue}</div>
                <div></div>
            </div>
        </div>
    )
}
export default HeadInput;