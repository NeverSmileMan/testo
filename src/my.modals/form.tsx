import React from 'react';
import exampleInstanceName from './config';
import { useDialog } from './modals';

const FillFormButton = () => {
   const { open } = useDialog();
  const fillForm = () => open(exampleInstanceName)

  return <button onClick={fillForm}>fill form from modal</button>
}


export default FillFormButton;