import React, {createContext, FC, useContext, useState} from 'react';
import {ITab} from "./header/Tab";


const TabsContext = createContext({})

export const useTabContext = () => useContext(TabsContext)


const TabsProvider: FC = ({children}) => {

	const [tabs, setTabs] = useState([{active: true, tabNumber: 1, tara: 0} as ITab])

	return (
		<TabsContext.Provider value={tabs}>
			{children}
		</TabsContext.Provider>
	);
};

export default TabsProvider;
