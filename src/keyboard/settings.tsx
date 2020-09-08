import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Keyboard  } from './keyboard';

const arr_EN = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',{
  key: ' ',
  opts: {
    hMultiplier: 1,
    wMultiplier: 3,
  },
},];
const arr_RU = ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ','ф','ы','в','а','п','р','о','л','д','ж','э','я','ч','с','м','и','т','ь','б','ю','ё',{
  key: ' ',
  opts: {
    hMultiplier: 1,
    wMultiplier: 3,
  },
},];
const arr_UK = ['й','ц','у','к','е','н','г','ш','щ','з','х','ї','ф','і','в','а','п','р','о','л','д','ж','є','я','ч','с','м','и','т','ь','б','ю','ґ', 	{
  		key: ' ',
  		opts: {
  			hMultiplier: 1,
  			wMultiplier: 3,
  		},
  	},];
const arr_num = ['7','8','9','4','5','6','1','2','3',{
  key: '0',
  opts: {
    hMultiplier: 1,
    wMultiplier: 3,
  },
}];

export const keyBoard: Keyboard = {
	alphabet:{
		keys: {
			en: arr_EN,
			ru: arr_RU,
			uk: arr_UK,
		},
		action: 'add',
		options: {
			en: {
        row: 3,
        col: 9,
        shiftEvenRow: true,
        additionalCol: true, //	change from '>  >' to '>  <'
        shiftDivider: 3, //shift on 1/3
        gridGap: '0.5em',
      },
			ru: {
        row: 3,
        col: 12,
        shiftEvenRow: true,
      },
			uk: {
        row: 3,
        col: 12,
        shiftEvenRow: true,
      },
		},
	}, 
	numeric: {
		keys: arr_num,
		action: 'add',
		options: {
      row: 4,
      col: 3,
    },
	},
	
	special: {
		keys: [
			{
				name: 'icon',
				action: 'delete',
				value: <ArrowBackIcon />,
			},
			{
				value: 'CLEAR',
				action: 'clear',
			},
			{
				name: 'layout',
				action: 'none',
				value: {
					en: 'EN',
					ru: 'RU',
					uk: 'UA',
				},
			},
		],
		options: {
      row: 3,
      col: 1,
    },
	},
};
