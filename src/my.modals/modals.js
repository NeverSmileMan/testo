// Пример config.js

import React, { useContext } from 'react';
import { DialogContext } from './Provider';
import  {MainContext} from '../main'


export const useDialog = () => {
  const { setEvents, setInstances, config } = useContext(DialogContext);
  const { setActiveTab } = useContext(MainContext);


  const open = instance => {

      new Promise((resolve, reject) => {
  

          setInstances(prevInstances => [...prevInstances, instance]);
          setEvents(prevEvents => [...prevEvents, { resolve, reject }]);
          
      })
      .then(result => {
        console.log('qqqqqqqqqqqqqqqqqqq')
        setActiveTab(1)});
  }

  return { open };
};
