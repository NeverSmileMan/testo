import React from 'react';
import Speed from '@material-ui/icons/Speed';
import Print from '@material-ui/icons/Print';
import CheckCircle from '@material-ui/icons/CheckCircle';

export const buttons = [
    {
      type: 'tara',
      text: 'тара',
      renderIcon: () => (<Speed />)
    },
    {
      type: 'print',
      text: 'друк',
      renderIcon: () => (<Print />)
    },
    {
      type: 'close',
      text: 'закрити',
      renderIcon: () => (<CheckCircle />)
    }
  ]