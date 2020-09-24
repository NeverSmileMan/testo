import React from 'react';
 enum Lang {
	EN = 'en',
	RU = 'ru',
	UA = 'uk',
}

export const LayoutContext = React.createContext({
	name: '' as Lang,
	setName: (val: Lang) => {},
	names: [] as Lang[],
});