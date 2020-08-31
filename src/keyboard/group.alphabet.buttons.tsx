import React, {useCallback} from 'react';
import Button from './button';
import { makeStyles } from '@material-ui/styles';
import {WTF} from './WTF'; //---------------------------------------------

interface Props {
  value: string[];
  onClick: any;
}

const options = {
 alphabet: {
   row: 3,
   btnQtyInRow: 12,
 }
}

const useStyles = makeStyles(WTF);

export default function GroupAlphabetButtons({value, onClick} : Props) {
  const classes = useStyles();
  
// const createStyles = useCallback(
//   () => {
//     let arr = [];
//     for (let i = 0; i < options.alphabet.row*options.alphabet.btnQtyInRow; i++) {
//       arr.push(	btn: {
//         gridColumn: 1,
//         gridRow: 2,
//       })
//     }
    
//   },
//   [value],
// )

  
  return (
    <div className={'keyboard-alphabet ' + classes.grid}>
      {value.map((item: string, id: number) => (
        <Button key={id} value={item} callback={onClick}  className={'btn-alphabet ' + classes[id]} ></Button> 
      ))}
    </div>
  )
}










// //-------------------------------------
// import React from 'react';
// import Button from './button';

// interface Props {
//   value: string[];
//   onClick: any;
// }


// export default function GroupAlphabetButtons({value, onClick} : Props) {

//   return (
//     <div className='keyboard-alphabet'>
//       {value.map((item: string, id: number) => (
//         <Button key={id} value={item} callback={onClick}  className={'btn-alphabet'} ></Button> 
//       ))}
//     </div>
//   )
// }

