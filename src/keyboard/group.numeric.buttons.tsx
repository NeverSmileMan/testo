import React from 'react';
import Button from './button';

interface Props {
  value: number[];
  onClick: any;  //-----
}

export default function GroupNumericButtons({value, onClick} : Props) {
  return (
    <div className='keyboard-numeric keyboard-numeric-grid'>
      {value.map((item: number, id: number) => (
        <>
          <Button key={id} value={item} callback={onClick} className={`btn-numeric key-${id}`} ></Button>
        </>
      ))}
    </div>
  )
}