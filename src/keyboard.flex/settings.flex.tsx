import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Keyboard  } from './keyboard.flex';

const arr_EN = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['z','x','c','v','b','n','m',' ']];
const arr_RU = [['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],['ф','ы','в','а','п','р','о','л','д','ж','э','ё'],['я','ч','с','м','и','т','ь','б','ю',' ']];
const arr_UK = [['й','ц','у','к','е','н','г','ш','щ','з','х','ї'],['ф','і','в','а','п','р','о','л','д','ж','є','ґ'],['я','ч','с','м','и','т','ь','б','ю',' ']];
const arr_num = ['7','8','9','4','5','6','1','2','3','0'];


export const keyBoardFlex: Keyboard = {
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
      },
			ru: {
        row: 3,
        col: 12,
      },
			uk: {
        row: 3,
        col: 12,
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
