import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IKeyboard } from './keyboard.interfaces';

const keysEN = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ' '],
];
const keysRU = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
  ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ' '],
];
const keysUK = [
  ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'],
  ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'ґ'],
  ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ' '],
];
const keysNum = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

export const keyboardSettings: IKeyboard = {
  alphabet: {
    keys: {
      uk: keysUK,
      ru: keysRU,
      en: keysEN,
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
    keys: keysNum,
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
        id: 1,
        action: 'delete',
        value: '',
        icon: <ArrowBackIcon />,
      },
      {
        value: 'CLEAR',
        action: 'clear',
        id: 2,
      },
      {
        name: 'layout',
        action: 'none',
        id: 3,
        value: '',
        layouts: {
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
