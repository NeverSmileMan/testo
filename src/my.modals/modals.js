// Пример config.js

import React, { useContext } from 'react';
import { DialogContext } from './Provider';



export const useDialog = () => {
  const { setEvents, setInstances, config } = useContext(DialogContext);

  const open = instance =>
    new Promise((resolve, reject) => {
      if (instance.instanceName in config) {
        setInstances(prevInstances => [...prevInstances, instance]);
        setEvents(prevEvents => [...prevEvents, { resolve, reject }]);
      } else {
        throw new Error(`${instance['instanceName']} don't exist in modal config`);
      }
    });

  return { open };
};